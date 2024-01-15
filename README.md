# Money on the Line

![Money on the Line Logo](app/assets/draft_logo.png)

Made for the United Hacks V2 hackathon.

By:

- Rodrigo Tiscareno
- Inesh Jacob
- Swetaa Suresh
- Donovan Hiebert

## Project Description

"Money on the Line" is a competitive-based mobile application designed to support and gamify New Year resolutions. It focuses on various life improvement sectors like finance, fitness, health, and more. The app allows users to set specific goals, interact with ChatGPT for refining these goals, join communities, and add friends for a more engaging experience. With features like goal validation, leaderboards, and daily/weekly/monthly challenges, it motivates users to stay committed to their resolutions in a fun and interactive way.

[Devpost](https://devpost.com/software/money-on-the-line#updates)

## Set-Up and Installation

### Prerequisites

- Node.js and npm (Node Package Manager)
- Python with pip for backend services
- Expo CLI
- Firebase account for database and authentication services
- ChatGPT API token

### Brief Set-up Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rodrigotiscareno/money-on-the-line.git
   ```
2. **Set-Up Firebase:**

Create a Firebase project and configure Firestore and Authentication services.
Add your Firebase project configuration to the application. 

3. **Integrate ChatGPT API:**

Obtain a ChatGPT API token.
Configure the token within the project for AI integration. 

4. **Set-up Secrets in .env**:
   
Outline the secrets from 3. and 4. to an .env file as per the .env.sample.

5. **Install Python Dependencies:**
   
Make sure Python and pip are installed on your system as per the *requirements.txt* file:
`pip install -r requirments.txt

6. **Start the Flask Server:**
    
Navigate to the server directory and run *app.py* to run the server:
   `python app.py`

7. **Install Node Dependencies:**
    
Navigate to the client directory and install the required Node.js dependencies:
   `npm install --legacy-peer-deps`
   
8. **Start the Development Server:**

Run the React Native development server using Expo:
`npm expo start`

9. **Set-up Emulator:**

To simulate the application on your personal mobile device scan the QR code generated after download the Expo Go application. Otherwise there exists a web version or mobile development SDK's to run on the computer.

Thank you to the United Hacks organization committee for a great hackathon experience!


