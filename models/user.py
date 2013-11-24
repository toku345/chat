from mongoengine import Document, EmbeddedDocument
from mongoengine import (
    DictField,
    StringField,
    ListField,
    MapField,
    ReferenceField,
    EmbeddedDocumentField,
    )


class User(Document):
    user_id = StringField(primary_key=True, required=True)
    name = StringField(required=True)

    @classmethod
    def set_indexes(cls):
        cls.ensure_index('+user_id', background=True)

    def get_relate_twitter_event(self):
        pass
