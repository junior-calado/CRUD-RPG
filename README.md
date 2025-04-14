# RPG Game Management System

## Description
This project is an API for managing RPG characters and magical items. It allows users to create, update, delete, and retrieve characters and magical items, as well as manage their associations. The API is built using the NestJS framework and includes Swagger documentation for easy testing and exploration of the endpoints.

## Features
- **Character Management**:
  - Create characters with attributes like strength, defense, and class.
  - Update adventurer names.
  - Retrieve character details, including total strength and defense (considering magical items).
  - Delete characters.

- **Magical Item Management**:
  - Create magical items with attributes like type, strength, and defense.
  - Assign magical items to characters.
  - Remove magical items from characters.
  - Retrieve magical items by ID or associated character.
  - Delete magical items.

- **Validation Rules**:
  - Characters must distribute exactly 10 points between strength and defense.
  - Magical items have specific rules based on their type (e.g., weapons must have 0 defense).
  - A character can only have one magical item of type "Amulet."

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd CRUD-RPG
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run start:dev
   ```
2. The API will be available at `http://localhost:3000`.

### Swagger Documentation
- Access the Swagger UI at `http://localhost:3000/api`.
- Use the Swagger interface to explore and test all endpoints.

## API Endpoints

### Character Endpoints
- **POST /characters**: Create a new character.
- **GET /characters**: Retrieve a list of all characters.
- **GET /characters/{id}**: Retrieve details of a specific character by ID.
- **PUT /characters/{id}/adventurer-name**: Update the adventurer name of a character.
- **DELETE /characters/{id}**: Delete a character by ID.

### Magical Item Endpoints
- **POST /magical-items**: Create a new magical item.
- **GET /magical-items**: Retrieve a list of all magical items.
- **GET /magical-items/{id}**: Retrieve details of a specific magical item by ID.
- **GET /magical-items/character/{characterId}**: Retrieve all magical items associated with a character.
- **GET /magical-items/character/{characterId}/amulet**: Retrieve the amulet associated with a character.
- **PUT /magical-items/{id}/assign/{characterId}**: Assign a magical item to a character.
- **PUT /magical-items/{id}/remove/{characterId}**: Remove a magical item from a character.
- **DELETE /magical-items/{id}**: Delete a magical item by ID.

## Validation Rules
- **Characters**:
  - Strength and defense must sum to 10.
  - Only predefined classes are allowed (e.g., Warrior, Mage, Archer).

- **Magical Items**:
  - Weapons must have 0 defense.
  - Armor must have 0 strength.
  - Amulets can have both strength and defense, but a character can only have one amulet.
