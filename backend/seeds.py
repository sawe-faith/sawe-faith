from app import app
from models import Job, db
from random import choice as rc
from faker import Faker

with app.app_context():
    fake=Faker()
    
    jobs=[]
    salaries=['$200', '$450', '$2000', '$240', '$4500', '$2900']
    
    for n in range(50):
        job=Job(company=fake.name(), job_title=fake.name(), job_description=fake.text(30), salary=rc(salaries) )
        jobs.append(job)
        
    db.session.add_all(jobs)
    db.session.commit()
