from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import firestore
from dotenv import load_dotenv
from datetime import datetime
import random

from models.Challenge import Challenge
from models.User import User

load_dotenv()

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

db = firestore.Client()


@app.route("/api/add_challenge", methods=["POST"])
def add_challenge():
    try:
        challenge_data = request.json
        challenge = Challenge(
            title=challenge_data["title"],
            description=challenge_data["description"],
            participants=challenge_data["participants"],
            start_date=datetime.now(),
            end_date=challenge_data["end_date"],
            visibility=challenge_data["visibility"],
            money_on_the_line=challenge_data["money_on_the_line"],
        )
        db.collection("challenges").add(challenge.to_dict())
        return jsonify({"message": "Challenge added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/challenges/participant/<participant_id>", methods=["GET"])
def get_challenges_by_participant(participant_id):
    try:
        challenges_query = db.collection("challenges").where(
            "participants", "array_contains", participant_id
        )
        challenges = [doc.to_dict() for doc in challenges_query.stream()]

        return jsonify(challenges), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/add_user", methods=["POST"])
def add_user():
    try:
        user_data = request.json
        user = User(
            user_id=user_data["user_id"],
            username=user_data["email"].split("@")[0],
            email=user_data["email"],
            full_name=user_data["fullName"],
            date_of_birth=user_data["dob"],
            registration_date=datetime.now(),
            bio=user_data["bio"],
        )
        db.collection("users").add(user.to_dict())
        return jsonify({"message": "Challenge added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/get_user", methods=["GET"])
def get_user():
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"error": "user_id parameter is missing"}), 400

        # Search for the user document by the user_id field
        users_ref = db.collection("users")
        query = users_ref.where("user_id", "==", user_id)
        docs = query.stream()

        # Assuming user_id is unique and only one document should match
        for doc in docs:
            print(jsonify(doc.to_dict()))
            return jsonify(doc.to_dict()), 200

        return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/get_user_milestones", methods=["GET"])
def get_user_milestones():
    try:
        user_id = request.args.get("user_id")
        print(user_id)

        challenges_ref = db.collection("challenges")
        challenges_query = challenges_ref.where(
            "participants", "array_contains", user_id
        )
        challenges = challenges_query.stream()

        user_challenge_milestones = {}
        for challenge in challenges:
            print(challenge)
            challenge_data = challenge.to_dict()
            challenge_id = challenge.id
            milestones = challenge_data.get("milestones", [])

            user_challenge_milestones[challenge_id] = milestones

        return jsonify(user_challenge_milestones), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/get_challenge_by_id", methods=["GET"])
def get_challenge_by_id():
    try:
        challenge_id = request.args.get("challenge_id")
        if not challenge_id:
            return jsonify({"error": "challenge_id parameter is missing"}), 400

        challenge_ref = db.collection("challenges").document(challenge_id)
        challenge_doc = challenge_ref.get()

        if challenge_doc.exists:
            return jsonify(challenge_doc.to_dict()), 200
        else:
            return jsonify({"error": "Challenge not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/get_user_friends", methods=["GET"])
def get_user_friends():
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"error": "user_id parameter is missing"}), 400

        # Search for the user document by the user_id field
        users_ref = db.collection("users")
        user_query = users_ref.where("user_id", "==", user_id)
        user_docs = user_query.stream()

        # Assuming user_id is unique and only one document should match
        for user_doc in user_docs:
            user_data = user_doc.to_dict()
            friends_ids = user_data.get("friends", [])

            # Retrieve the user documents for each friend ID
            friends_data = []
            for friend_user_id in friends_ids:
                friend_query = users_ref.where("user_id", "==", friend_user_id)
                friend_docs = friend_query.stream()

                for friend_doc in friend_docs:
                    friend_data = friend_doc.to_dict()
                    friends_data.append(friend_data)

            return jsonify({"friends": friends_data}), 200

        return jsonify({"error": "User not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/add_friend", methods=["POST"])
def add_friend():
    try:
        data = request.get_json()
        current_user_id = data.get("current_user_id")
        friend_user_id = data.get("friend_user_id")

        if not current_user_id or not friend_user_id:
            return (
                jsonify(
                    {
                        "error": "current_user_id and friend_user_id parameters are required"
                    }
                ),
                400,
            )

        current_user_ref = db.collection("users").where(
            "user_id", "==", current_user_id
        )
        current_user_docs = current_user_ref.stream()
        current_user = None
        for doc in current_user_docs:
            current_user = doc
            break
        if not current_user:
            return jsonify({"error": "Current user not found"}), 404

        friend_user_ref = db.collection("users").where("user_id", "==", friend_user_id)
        friend_user_docs = friend_user_ref.stream()
        friend_user = None
        for doc in friend_user_docs:
            friend_user = doc
            break
        if not friend_user:
            return jsonify({"error": "Friend user not found"}), 404

        current_user_data = current_user.to_dict()
        friends_list = current_user_data.get("friends", [])
        if friend_user_id not in friends_list:
            friends_list.append(friend_user_id)
            current_user.reference.update({"friends": friends_list})
            return (
                jsonify(
                    {"success": f"User {friend_user_id} has been added as a friend"}
                ),
                200,
            )
        else:
            return jsonify({"message": "User is already a friend"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/get_all_users", methods=["GET"])
def get_all_users():
    try:
        # Reference to the users collection
        users_ref = db.collection("users")

        # Retrieve all user documents
        all_users_query = users_ref.stream()

        # Compile a list of users' data
        users_list = [doc.to_dict() for doc in all_users_query]

        return jsonify(users_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/get_explore_challenges", methods=["GET"])
def get_explore_challenges():
    PROMPTS = [
        "Get fitter and healthier!",
        "Pursue further education and self-develop my skills"
        "Spend more time with family",
        "Practice spirituality",
    ]

    try:
        challenge = Challenge(
            title=PROMPTS[random.randint(0, len(PROMPTS) - 1)],
            description=PROMPTS[random.randint(0, len(PROMPTS) - 1)],
            participants=[1],
            start_date=datetime.now(),
            end_date="January 1, 2025 at 12:00:00 AM UTC-5",
            visibility=True,
            money_on_the_line=100,
        )
        response = challenge.get_challenges(
            challenge.title,
            {
                challenge.title,
                challenge.description,
                challenge.end_date,
                challenge.money_on_the_line,
            },
        )

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
