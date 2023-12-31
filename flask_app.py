# IMPORT DEPENDENCIES
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#CREATE ENGINE
engine = create_engine("sqlite:///tri_database.sqlite")

Base = automap_base()

Base.prepare(autoload_with=engine)

# TABLE REFERENCES
Chemicals = Base.classes.chemicals
Industry = Base.classes.industry
Tribes = Base.classes.tribes
Tri_data = Base.classes.tri_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# START PAGE
@app.route("/")
def welcome():
    """LISTS ALL AVAILABLE API ROUTES"""
    return(
        f"<h3>Available Routes:</h3><br/>"
        f"<br/>"
        f"<strong>This route contains the locations of all toxic releases in 2021 (FOR MAP):</strong><br/>"
        f"<p style='color:Tomato;'>/api/location</p>"
        f"<br/>"
        f"<strong>This route contains the values of all toxic releases in 2021:</strong><br/>"
        f"<p style='color:Orange;'>/api/values</p>"
        f"<br/>"
        f"<strong>This route contains a list of the chemical names:</strong><br/>"
        f"<p style='color:MediumSeaGreen;'>/api/chemicals</p>"
        f"<br/>"
        f"<strong>This route contains a list of the industry names:</strong><br/>"
        f"<p style='color:DodgerBlue;'>/api/industries</p>"
        f"<br/>"
        f"<strong>This route contains a list of all the toxic releases on occuring on tribal lands:</strong><br/>"
        f"<p style='color:SlateBlue;'>/api/tribes</p>"
        #f"<br/>"
        #f"<strong>This route contains all toxic releases in 2021:</strong><br/>"
        #f"<p style='color:Purple;'>/api/all</p>"
    )

# LOCATION DATA - TOO LARGE FOR ALL, HAD TO SPLIT IT UP
@app.route("/api/location", methods=["GET"])
def location():
    session = Session(engine)

    results = session.query(Tri_data.DOCUMENT_NUMBER, Tri_data.FACILITY_NAME, Tri_data.PARENT_COMPANY_NAME, Tri_data.LATITUDE, Tri_data.LONGITUDE, Tri_data.FEDERAL_FACILITY, Tri_data.CARCINOGEN, Tri_data.ON_SITE_RELEASE_TOTAL, Tri_data.INDUSTRY_SECTOR_CODE).all()
    
    session.close()

    location_list = []
    for DOCUMENT_NUMBER, FACILITY_NAME, PARENT_COMPANY_NAME, LATITUDE, LONGITUDE, FEDERAL_FACILITY, CARCINOGEN, ON_SITE_RELEASE_TOTAL, INDUSTRY_SECTOR_CODE in results:
        location_dict = {}
        location_dict["DocumentNumber"] = DOCUMENT_NUMBER
        location_dict["FacilityName"] = FACILITY_NAME
        location_dict["ParentCompanyName"] = PARENT_COMPANY_NAME
        location_dict["Latitude"] = LATITUDE
        location_dict["Longitude"] = LONGITUDE
        location_dict["FederalFacility"] = FEDERAL_FACILITY
        location_dict["Carcinogen"] = CARCINOGEN
        location_dict["On_SiteReleaseTotal"] = ON_SITE_RELEASE_TOTAL
        location_dict["IndustrySectorCode"] = INDUSTRY_SECTOR_CODE
        location_list.append(location_dict)        

    # REFERENCED https://stackoverflow.com/questions/25860304/how-do-i-set-response-headers-in-flask
    response = jsonify(location_list)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# VALUES (2ND HALF OF LOCATION DATA)
@app.route("/api/values")
def values():
    session = Session(engine)

    results = session.query(Tri_data.DOCUMENT_NUMBER, Tri_data.REGION, Tri_data.TRIBAL_LAND, Tri_data.INDUSTRY_SECTOR_CODE, Tri_data.SRS_ID, Tri_data.METAL_CATEGORY, Tri_data.CARCINOGEN, Tri_data.ON_SITE_RELEASE_TOTAL, Tri_data.OFF_SITE_RELEASE_TOTAL, Tri_data.OFF_SITE_RECYCLED_TOTAL, Tri_data.ONE_TIME_RELEASE).all()
    
    session.close()

    tridata_list = []
    for DOCUMENT_NUMBER, REGION, TRIBAL_LAND, INDUSTRY_SECTOR_CODE, SRS_ID, METAL_CATEGORY, CARCINOGEN, ON_SITE_RELEASE_TOTAL, OFF_TOTAL_RELEASE_TOTAL, OFF_SITE_RECYCLED_TOTAL, ONE_TIME_RELEASE in results:
        tridata_dict = {}
        tridata_dict["DocumentNumber"] = DOCUMENT_NUMBER
        tridata_dict["Region"] = REGION
        tridata_dict["TribalLand"] = TRIBAL_LAND
        tridata_dict["IndustrySectorCode"] = INDUSTRY_SECTOR_CODE
        tridata_dict["SRSID"] = SRS_ID
        tridata_dict["MetalCategory"] = METAL_CATEGORY
        tridata_dict["Carcinogen"] = CARCINOGEN
        tridata_dict["On_SiteReleaseTotal"] = ON_SITE_RELEASE_TOTAL
        tridata_dict["Off_SiteReleaseTotal"] = OFF_TOTAL_RELEASE_TOTAL
        tridata_dict["Off_SiteRecycledTotal"] = OFF_SITE_RECYCLED_TOTAL
        tridata_dict["OneTimeRelease"] = ONE_TIME_RELEASE
        tridata_list.append(tridata_dict)        

    response = jsonify(tridata_list)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# UNIQUE LIST OF CHEMICALS
@app.route("/api/chemicals")
def chemicals():
    session = Session(engine)

    results = session.query(Chemicals.SRS_ID, Chemicals.CHEMICAL).all()

    session.close()

    chemical_list = []
    for SRS_ID, CHEMICAL in results:
        chemical_dict = {}
        chemical_dict["SRS_ID"] = SRS_ID
        chemical_dict["ChemicalName"] = CHEMICAL
        chemical_list.append(chemical_dict)        

    response = jsonify(chemical_list)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# UNIQUE LIST OF INDUSTRIES
@app.route("/api/industries")
def industries():
    session = Session(engine)

    results = session.query(Industry.INDUSTRY_SECTOR_CODE, Industry.INDUSTRY_SECTOR).all()

    session.close()

    industry_list = []
    for INDUSTRY_SECTOR_CODE, INDUSTRY_SECTOR in results:
        industry_dict = {}
        industry_dict["IndustrySectorCode"] = INDUSTRY_SECTOR_CODE
        industry_dict["IndustrySector"] = INDUSTRY_SECTOR
        industry_list.append(industry_dict)        

    response = jsonify(industry_list)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# LIST OF ALL DOCUMENT NUMBERS ON TRIBAL LANDS
@app.route("/api/tribes")
def tribes():
    session = Session(engine)

    results = session.query(Tribes.DOCUMENT_NUMBER, Tribes.TRIBAL_LAND).all()

    session.close()

    tribal_list = []
    for DOCUMENT_NUMBER, TRIBAL_LAND in results:
        tribal_dict = {}
        tribal_dict["DocumentNumber"] = DOCUMENT_NUMBER
        tribal_dict["TribalLand"] = TRIBAL_LAND
        tribal_list.append(tribal_dict)       

    response = jsonify(tribal_list)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


#@app.route("/api/all", methods=["GET"])
#def all():
#    session = Session(engine)

#    results = session.query(Tri_data.DOCUMENT_NUMBER, Tri_data.FACILITY_NAME, Tri_data.PARENT_COMPANY_NAME, Tri_data.LATITUDE, Tri_data.LONGITUDE, Tri_data.FEDERAL_FACILITY, Tri_data.CARCINOGEN, Tri_data.ON_SITE_RELEASE_TOTAL, Tri_data.INDUSTRY_SECTOR_CODE, Tri_data.REGION, Tri_data.STATE, Tri_data.SRS_ID, Tri_data.METAL_CATEGORY, Tri_data.OFF_SITE_RELEASE_TOTAL, Tri_data.OFF_SITE_RECYCLED_TOTAL, Tri_data.ONE_TIME_RELEASE, Tri_data.TRIBAL_LAND, Industry.INDUSTRY_SECTOR, Chemicals.CHEMICAL).all()
    
#    session.close()

#    all_list = []
#    for DOCUMENT_NUMBER, FACILITY_NAME, PARENT_COMPANY_NAME, LATITUDE, LONGITUDE, FEDERAL_FACILITY, CARCINOGEN, ON_SITE_RELEASE_TOTAL, INDUSTRY_SECTOR_CODE, REGION, STATE, TRIBAL_LAND, SRS_ID, METAL_CATEGORY, OFF_SITE_RECYCLED_TOTAL, OFF_SITE_RELEASE_TOTAL, ONE_TIME_RELEASE, INDUSTRY_SECTOR, CHEMICAL in results:
#        all_dict = {}
#        all_dict["Document number"] = DOCUMENT_NUMBER
#        all_dict["Facility Name"] = FACILITY_NAME
#        all_dict["Parent Company Name"] = PARENT_COMPANY_NAME
#        all_dict["Latitude"] = LATITUDE
#        all_dict["Longitude"] = LONGITUDE
#        all_dict["Federal Facility"] = FEDERAL_FACILITY
#        all_dict["Carcinogen"] = CARCINOGEN
#        all_dict["On-site Release Total"] = ON_SITE_RELEASE_TOTAL
#        all_dict["Industry Sector Code"] = INDUSTRY_SECTOR_CODE
#        all_dict["Region"] = REGION
#        all_dict["State"] = STATE
#        all_dict["Tribal Land"] = TRIBAL_LAND
#        all_dict["SRS ID"] = SRS_ID
#        all_dict["Metal Category"] = METAL_CATEGORY
#        all_dict["Off-site Release Total"] = OFF_SITE_RELEASE_TOTAL
#        all_dict["Off-site Recycled Total"] = OFF_SITE_RECYCLED_TOTAL
#        all_dict["One-time Release"] = ONE_TIME_RELEASE
#        all_dict["Industry Sector"] = INDUSTRY_SECTOR
#        all_dict["Chemical Name"] = CHEMICAL
#        all_list.append(all_dict)        
#    response = jsonify(all_list)
#    response.headers["Access-Control-Allow-Origin"] = "*"
#    return response

if __name__ == '__main__':
    app.run(debug=True)