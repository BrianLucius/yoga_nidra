
# Yoga Nidra Script Manager

This is my capstone project for the Coding Dojo Python stack. 

After earning a Black Belt on my Python Stack exam (indicating mastery of both core and advanced concepts, plus the ability to synthesize new concepts under pressure), students are allotted no more than seven days to design, plan, build, publish, and present a full-stack web application to their cohort.

For my first full-stack application, I created a Yoga Nidra Script manager application to support my growth as a yoga teacher and meditation facilitator. The particular lineage of Yoga Nidra I study and practice dictates a precise set of languaging and scripts to be used to guide the practitioner on their journey. There are multiple choices of scripts for each stage of the practice, therefore, building and keeping track of facilitators and practitioners favorite meditations can be challenging.

This solution solves the challenge of building and saving custom scripts for later recall.

## 👾 Tech Stack
The application is built exclusively in Python using Flask and Jinja2 as the template engine. The backend is a relational database running on MySQL. 

Other features include using the bcrypt library to validate and store encrypted user passwords at rest and python-dotenv to store database credentials outside of version controlled files.

Additionally, the [zenquotes.io](https://zenquotes.io/) free API was integrated to provide random inspirational quotes to application users on their dashboards.

## 🍿 Demo
* Provides new user registration
* Supports user authentication, credential validation and requires password complexity
* Offers the ability for application users to create, edit, and delete any of their saved sequences
* Playback of the sequence is offered in a minimalist view to reduce distractions
[View the demo video](https://youtu.be/b7hhidRaD1A)

## 🙏 Gratitude
Tremendous gratitude to [Alfredo Salazar](https://www.linkedin.com/in/alfredo-salazar-6562b4a1/) and [Spencer Rauch](https://www.linkedin.com/in/spencer-rauch/), my instructors for the python stack. Their experience, patience, and thoroughness contributed immensely to a hugely successful outcome for this stack.

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brianjlucius)




