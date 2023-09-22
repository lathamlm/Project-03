import sqalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

engine = create_engine("sqlite:///tri_database.sqlite")

Base = automap_base()

Base.prepare(autoload_with=engine)

# Save reference to the table
Passenger = Base.classes.

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

