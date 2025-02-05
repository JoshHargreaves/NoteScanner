# NoteScanner

NoteScanner is a web application that allows users to view and summarize text notes. The application fetches `.txt` files from a specified directory, generates summaries for each file, and displays the content in a user-friendly interface.

## Features

- Fetches `.txt` files from the server
- Generates summaries for each note
- Displays the full content of selected notes
- User-friendly sidebar for easy navigation

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notescanner.git
   cd notescanner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- The sidebar displays a list of `.txt` files with their summaries.
- Click on a note in the sidebar to view its full content and summary.
- If no notes are found, a message will be displayed indicating that no `.txt` files were found.

## API

- The application fetches notes from the `/api/notes` endpoint.
- The endpoint reads `.txt` files from the `public/notes` directory and returns their content.

## License

This project is licensed under the GNU General Public License (GPL).
