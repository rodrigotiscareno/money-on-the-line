import json
from .ChatGPT import ResolutionBuddy


class Challenge:
    def __init__(
        self,
        title,
        description,
        participants,
        start_date,
        end_date,
        visibility,
        money_on_the_line,
    ):
        self.title = title
        self.description = description
        self.participants = participants
        self.start_date = start_date
        self.end_date = end_date
        self.money_on_the_line = money_on_the_line
        self.milestones = self.get_milestones(title, self.format_data_for_prompt)

        # These attributes will be determined by the user.
        self.status = "active"
        self.visibility = visibility
        self.winner = None
        self.progress = {}

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "participants": self.participants,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "milestones": self.milestones,
            "money_on_the_line": self.money_on_the_line,
            "status": self.status,
            "visibility": self.visibility,
            "winner": self.winner,
            "progress": self.progress,
        }

    @staticmethod
    def from_dict(source):
        challenge = Challenge(
            title=source["title"],
            description=source["description"],
            participants=source["participants"],
            start_date=source["start_date"],
            end_date=source["end_date"],
            visibility=source["visibility"],
            money_on_the_line=source["money_on_the_line"],
        )
        challenge.milestones = source.get("milestones", [])
        challenge.status = source.get("status", "active")
        challenge.winner = source.get("winner", None)
        challenge.progress = source.get("progress", {})
        return challenge

    @classmethod
    def format_data_for_prompt(self):
        return {
            "title": self.title,
            "description": self.description,
            "end_date": self.end_date,
            "money_on_the_line": self.money_on_the_line,
        }

    @classmethod
    def get_milestones(self, title, data):
        gpt = ResolutionBuddy(title, data)
        return gpt.generate_milestones()

    @classmethod
    def get_challenges(self, title, data):
        gpt = ResolutionBuddy(title, data)
        return gpt.generate_challenges()
