from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy import func

convention={
    "ix": "ix_%(column_0_label)s",                  
    "uq": "uq_%(table_name)s_%(column_0_name)s",    
    "ck": "ck_%(table_name)s_%(constraint_name)s", 
    "fk": "fk_%(table_name)s_%(column_0_name)s",    
    "pk": "pk_%(table_name)s"                       
}

metadata=MetaData( naming_convention=convention)
db=SQLAlchemy(metadata=metadata)

#user model

class User(db.Model, SerializerMixin):
    __tablename__='users'
    
    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String, nullable=False, unique=True)
    email=db.Column(db.String)
    password=db.Column(db.String)
    user_role=db.Column(db.String)
    about=db.Column(db.String)
    location=db.Column(db.String)
    date_created = db.Column(db.DateTime, default=func.now())
    user_type=db.Column(db.String)
    last_active = db.Column(db.DateTime, default=func.now(), onupdate=func.now())
    
    @validates (email)
    def validate_email(self, key, email):
        if not email.endswith ('@gmail.com'):
            raise ValueError("invalid email. @ keyword required")
        return email
    def __repr__(self):
        return f'<User {self.id}, {self.username}, {self.email}, {self.password}, {self.user_role}, {self.about}, {self.location}, {self.date_created}, {self.last_active} >'
 
 #job model   
class Job(db.Model, SerializerMixin):
    __tablename__='jobs'
    
    id=db.Column(db.Integer, primary_key=True)
    company=db.Column(db.String)
    job_title=db.Column(db.String)
    job_description=db.Column(db.String)
    salary=db.Column(db.String)
    date_created = db.Column(db.DateTime, default=func.now())
    
    def __repr__(self):
        return f'<Job {self.id}, {self.company}, {self.job_title}, {self.job_description}, {self.salary}, {self.date_created}>'
    
    
    
    
    