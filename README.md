
Quotesite
Quotesite is a quote-sharing platform that allows users to view, share, and favorite quotes. 
The frontend is built using React, while the backend is managed by Django. This project separates 
the frontend and API into different projects, allowing for future API integrations.

Features
View and search for quotes.
Favorite quotes.
User authentication (login and logout).
React frontend with Django backend integration.
Django serves React static files in production.

Project Structure
Frontend: React app located in the quotesite-frontend directory.
Backend: Django project located in the quotesite directory.

Technologies
Backend: Django 5.x, Django REST framework (for future API integration)
Frontend: React (create-react-app)
Database: PostgreSQL
Static File Handling: WhiteNoise (for serving React's static files)
HTTP Requests: Axios (for future API requests)
Installation
Backend (Django)

Clone the repository:
git clone https://github.com/your-username/quotesite.git
cd quotesite
Set up a virtual environment and install dependencies:
python -m venv env
source env/bin/activate  # On Windows, use `env\Scripts\activate`
pip install -r requirements.txt
Configure PostgreSQL database:

Update the DATABASES setting in quotesite/settings.py:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
Run migrations to set up the database:

python manage.py makemigrations
python manage.py migrate

Run the Django development server:
python manage.py runserver

Frontend (React)
Navigate to the quotesite-frontend folder:
cd quotesite-frontend
Install React dependencies:

npm install
Run the React development server:

npm start
The React app should now be running on http://localhost:3000.

Connecting React and Django
During development, React is served from localhost:3000 and Django from localhost:8000. The two will be connected using Django to serve React's build files in production.

Production Setup
Build the React app:

In the quotesite-frontend folder, run:

npm run build
This will create a production-ready version of the React app in a build/ folder.

Copy the build folder to Django:

Move the build/ folder to quoteapp/templates/ in the Django project.

Serve React with Django:

Django will automatically serve the static files from the build/ folder using WhiteNoise when deployed.

Future Enhancements
Add more user features like creating and sharing quotes.
Integrate the backend API for remote access.
Enable JWT-based authentication for API security.
Allow users to categorize quotes and follow other users.

Deployment

Contributing
If you'd like to contribute to this project, feel free to submit a pull request or open an issue on GitHub.

License
This project is licensed under the MIT License.

This README.md covers the essentials for setup, development, and production.
