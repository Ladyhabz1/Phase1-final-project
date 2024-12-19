## BLOOM AND GLOW MAKE-UP WEB

### Description
+ A simple makeup shopping system that allows users to view product details, including name, brand, price, and description. Users can also purchase makeup products like eyeliners and lipsticks if they are available.
---
### Table of Contents
- [Description](#description)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Contribution](#how-to-contribute)
- [License](#license)
---
### Features 
- Displays a list of makeup products with their names and images.
- When a product is clicked, its full details are shown, including:
  - Name
  - Brand
  - Price
  - Description
  - Stock Availabality
- Users can purchase a makeup product (if in stock).
- The available stock is updated when a product is purchased.
- The "Buy Product" button is disabled when a product is out of stock.
---
### Project Structure

- **index.html**: Main HTML file that structures the page
- **script.js**: JavaScript file that handles dynamic content and logic
- **db.json**: Sample product data in JSON format
- **styles.css**: CSS file to style the page
- **README.md**: Project documentation
---
### Technologies Used 

- **HTML**: Used for the basic structure of the page.
- **CSS**: Used for styling the page and providing a responsive design.
- **JavaScript**: Handles the dynamic functionality, such as displaying product details and managing item purchases.
- **JSON**: A simple local JSON file (`db.json`) that contains the make-up data, including the name, brand, price, and description
---
## Setup Instructions

### 1. Clone the repository

```bash
git clone git@github.com:Ladyhabz1/Phase1-final-project.git
```

### 2. Navigate to the projcect directory

```bash
cd Phase1-final-project
```

### 3. Install JSON Server (if not already installed)

```bash
npm install -g json-server
```

### 4. Start the JSON Server

```bash
json-server --watch db.json
```

### 5. Open the Application in a Browser
+ Simply open the index.html file in your browser to view the project. You can do this by double-clicking the file or using a live server extension (e.g., in VS Code).
---

## 5. Contribution

Contributions are welcome! If you'd like to improve or expand on these programs:

1. Fork the repo
2. create a new branch 

```bash
git checkout -b feature/yourfeature
```
3. Commit your changes 

```bash 
git commit -m "Add a new feature"
```

4. Push to the branch
``` bash
git push origin feature/YourFeature 
```

5. Open a pull request 
---
## Contact
Can be reached by the email below for questions and comments 

[Email](guyohabibahassan@gmail.com)
---
## License
This project is licensed under the MIT License.