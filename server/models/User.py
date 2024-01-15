class User:
    def __init__(
        self,
        user_id,
        username,
        email,
        full_name,
        date_of_birth,
        registration_date,
        bio,
    ):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.full_name = full_name
        self.date_of_birth = date_of_birth
        self.registration_date = registration_date
        self.bio = bio
        self.friends = []

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "email": self.email,
            "full_name": self.full_name,
            "date_of_birth": self.date_of_birth,
            "registration_date": self.registration_date,
            "bio": self.bio,
            "friends": self.friends,
        }

    @staticmethod
    def from_dict(source):
        user = User(
            user_id=source["user_id"],
            username=source["username"],
            email=source["email"],
            full_name=source["full_name"],
            date_of_birth=source["date_of_birth"],
            registration_date=source["registration_date"],
            bio=source["bio"],
            friends=source["friends"],
        )
        return user
