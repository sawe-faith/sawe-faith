from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import create_access_token, JWTManager, get_jwt_identity, jwt_required
from flask_bcrypt import Bcrypt
from models import db, User, Job
import os
from flask_cors import CORS



app=Flask ("__name__")

app.config ['JWT_SECRET_KEY']=os.urandom(32).hex()
app.config ['SQLALCHEMY_DATABASE_URI']='sqlite:///job_seeker.db'
app.config ['SQLALCHEMY_TRACK_MODIFICATIONS']=False
app.json.compact=False

migrate=Migrate(app, db)

db.init_app(app)
api=Api(app)
jwt=JWTManager(app)
bcrypt=Bcrypt(app)
cors=CORS(app)

#index
class Index(Resource):
    def get(self):
        response_dict={
            "message":"welcome to the job seeker application database"
        }
        
        response=make_response(response_dict, 200)
        return response
    
api.add_resource(Index, '/')

#users
class Users(Resource):
    def get(self):
        user=[user.to_dict() for user in User.query.all()]
        if not user:
            return jsonify({
                "message":"users not found"
            }, 401
            )
        
        response=make_response(user, 200)
        return response
            
    def post(self):
        new_user=User(
            username=request.json['username'],
            email=request.json['email'],
            user_role=request.json['user_role'],
            about=request.json['about'],
            location=request.json['location'],
            password=bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        )
        
        print( f'new user...........{new_user}')
        
        db.session.add(new_user)
        db.session.commit()
        
        user_dict=new_user.to_dict()
        response=make_response(user_dict, 201)
        return response
        
        
    
api.add_resource(Users, '/users')

#user login

class User_Login(Resource):
    
    def post(self):
        email=request.json['email']
        username=request.json['username']
        password=request.json['password']
        
        #check for user existance
        user_exists=User.query.filter_by(email=email).first()
        
        if user_exists:
            access_token=create_access_token(identity='email')
            
            token={
                "id":user_exists.id,
                "email":user_exists.email,
                "username":user_exists.username,
                "access_token":access_token
            }
            
            response=make_response(token, 200)
            return response

api.add_resource(User_Login, '/user/login')

#user based on params

class User_By_Id(Resource):
    
    #get user based on a parameter, in this case it's the id
     
    
     def get(self, id):
        user_by_id=User.query.filter_by(id = id).first()
        user_dict=user_by_id.to_dict()
        response=make_response(user_dict, 200)
        return response
    
    #update user data
    
     def  patch(self, id):
         update_user=User.query.filter(User.id ==id).first()
         for attr in request.json:
             setattr(update_user, attr, request.json[attr])
             
             db.session.add(update_user)
             db.session.commit()
             
             response_dict=update_user.to_dict()
             response=make_response(response_dict, 201)
             return response
                       
api.add_resource(User_By_Id, '/user/<int:id>')

#jobs
class Jobs(Resource):
    #fetch all jobs
    
    def get(self):
        jobs=[job.to_dict() for job in Job.query.all()]
        
        if not jobs:
            return jsonify({
                "message":"jobs not found!"
            })
        response=make_response(jobs, 200)
        return response
    
    #create a new job
    def post(self):
        new_job=Job(
            company=request.json['company'],
            job_title=request.json['job_title'],
            job_description=request.json['job_description'],
            salary=request.json['salary']
        )
        db.session.add(new_job)
        db.session.commit()
        
        new_job_dict=new_job.to_dict()
        response=make_response(new_job_dict, 201)
        return response
    
api.add_resource(Jobs, '/jobs')

#jobs based on paranms
class JobById(Resource):
    def get(self, id):
        job=Job.query.filter_by(id=id).first()
        if job:
            job_dict=job.to_dict()
            response=make_response(job_dict, 200)
            return response
        else:
            return jsonify({"message":"job assosiated with this id cannot be found"}, 401)
        
    def patch(self, id):
        update_job=Job.query.filter(Job.id == id).first()
        if update_job:
            for attr in request.json:
                setattr(update_job, attr,request.json[attr])
                db.session.add(update_job)
                db.session.commit()
                
                job_dict=update_job.to_dict()
                response=make_response(job_dict, 201)
                return response
        else:
            return jsonify({"message":"failed to load update resource"}, 401)   
    def delete(self, id):
        delete_job=Job.query.filter(Job.id == id).first()
        if delete_job:
            db.session.delete(delete_job)
            db.session.commit()
            
            return jsonify({"message": "job has been successfully deleted"}, 204
                           )
        else:
            return jsonify({"message":"job with the associated id not found"}, 401)
            
                 
        
        
api.add_resource(JobById, '/jobs/<int:id>')
        
        


if __name__=="__main__":
    app.run(port=5555, debug=True)