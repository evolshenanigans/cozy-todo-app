# Cozy Todo App

A warm, inviting task management application with user authentication, task prioritization, categories, due dates, and progress tracking.

![Cozy Todo App Screenshot](https://source.unsplash.com/random/900x500/?cozy,desk)

## Features

- **User Authentication**: Register, login, and session management
- **Task Management**: Create, update, delete, and mark tasks as complete
- **Task Organization**: Categorize tasks and set priority levels
- **Task Tracking**: Set due dates and track progress (0-100%)
- **Dashboard**: Visual statistics about your tasks
- **Responsive Design**: Works beautifully on all device sizes
- **Cozy UI**: Warm colors and soft edges for a comfortable user experience

## Tech Stack

- **Frontend Framework**: React
- **State Management**: Redux
- **UI Library**: Material UI
- **Form Validation**: Custom validation
- **Routing**: React Router
- **Date Handling**: date-fns
- **Mock Backend**: Simulated API using localStorage

## Installation and Setup

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cozy-todo-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Initialize the project with sample data
```bash
node scripts/setup.js
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Open your browser and navigate to `http://localhost:3000`

6. Use these demo credentials to log in:
   - Email: `demo@example.com`
   - Password: `password123`
   
   Or register a new account

### Easy Setup Scripts

For convenience, you can also use the provided setup scripts:

- On Windows: Double-click `setup.bat`
- On Mac/Linux: Run `./setup.sh` in the terminal

## Usage

### Authentication

Log in with the demo account or create your own:

1. Navigate to the login page
2. Enter your credentials or click "Sign Up" to create a new account
3. After successful authentication, you'll be redirected to the dashboard

### Task Management

Once logged in:

1. **Create Tasks**: Use the form on the left to add new tasks
2. **View Tasks**: All your tasks appear in the main panel 
3. **Filter Tasks**: Use the search bar or filter by category
4. **Task Actions**: 
   - Check the checkbox to mark as complete
   - Click the edit icon to modify a task
   - Click the delete icon to remove a task

### Task Properties

Each task can have:
- Title and description
- Priority level (low, medium, high)
- Category (Personal, Work, Shopping, Health, Education, Other)
- Due date
- Completion progress (0-100%)

## Project Structure

```
public/               # Public assets and HTML template
  ├── data/           # Sample data JSON files
  ├── index.html      # Main HTML template
  └── manifest.json   # Web app manifest
scripts/              # Setup and utility scripts
  └── setup.js        # Initial setup script for sample data
src/                  # Source code
  ├── api/            # Mock API services
  │   ├── authService.js    # Authentication API
  │   └── taskService.js    # Task management API
  ├── components/     # Reusable UI components
  │   ├── auth/       # Authentication components
  │   ├── common/     # Common UI components
  │   └── tasks/      # Task-related components
  ├── pages/          # Page components
  ├── redux/          # Redux store, actions, and reducers
  │   ├── actions/    # Action creators
  │   └── reducers/   # State reducers
  ├── theme/          # Material UI theme configuration
  ├── utils/          # Utility functions
  ├── App.js          # Main application component
  ├── index.css       # Global styles
  └── index.js        # Application entry point
```

## Testing

This project includes a comprehensive test suite to ensure code quality and reliability. The tests cover components, services, Redux actions, and reducers.

### Test Setup

The testing environment uses:
- Jest as the test runner
- React Testing Library for component testing
- Redux Mock Store for testing Redux integration
- Custom testing utilities in `src/utils/test-utils.js`

### Running Tests

```bash
# Run tests in watch mode (development)
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests once (CI environment)
npm run test:ci
```

### Test Coverage

The test suite covers:
- Component rendering and interaction
- Redux state management
- API service functionality
- Form validation
- Authentication flow
- Task management operations

Coverage targets are set to 70% for:
- Statements
- Branches
- Functions
- Lines

### Test Structure

Tests are organized to mirror the source code structure:

```
src/
├── api/
│   └── __tests__/          # Tests for API services
├── components/
│   ├── auth/
│   │   └── __tests__/      # Tests for authentication components
│   └── tasks/
│       └── __tests__/      # Tests for task-related components
└── redux/
    ├── actions/
    │   └── __tests__/      # Tests for Redux actions
    └── reducers/
        └── __tests__/      # Tests for Redux reducers
```

### Key Test Categories

1. **Component Tests**: Verify that UI components render correctly and handle user interactions properly.

2. **Reducer Tests**: Ensure that state changes correctly in response to dispatched actions.

3. **Action Tests**: Verify that actions dispatch the correct types and payloads, including async actions.

4. **Service Tests**: Test the mock API services that handle data storage and retrieval.

For more details, see the [Testing Strategy Documentation](./TESTING.md).

## Deployment

The application can be deployed to various hosting services:

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `build` folder.

### Deployment Options

1. **Vercel**
   - Connect your GitHub repository
   - Set the framework preset to React
   - Deploy automatically from your main branch

2. **Netlify**
   - Connect your GitHub repository
   - Set the build command to `npm run build`
   - Set the publish directory to `build`

3. **GitHub Pages**
   - Install gh-pages: `npm install --save-dev gh-pages`
   - Add to package.json: `"homepage": "https://<username>.github.io/<repo-name>"`
   - Add deploy scripts: 
     ```
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
     ```
   - Deploy: `npm run deploy`

## Implementation Notes

### Mock Backend

Since this is a frontend-only implementation, the application uses mock API services that simulate a backend server:

- Data is stored in localStorage
- API calls are simulated with timeouts to mimic network requests
- JWT authentication is simulated

In a real-world scenario, you would replace these mock services with actual API calls to your backend server.

## Learning Resources

To better understand the implementation:

1. [React Documentation](https://reactjs.org/docs/getting-started.html)
2. [Redux Documentation](https://redux.js.org/introduction/getting-started)
3. [Material UI Documentation](https://mui.com/getting-started/usage/)
4. [React Router Documentation](https://reactrouter.com/web/guides/quick-start)
5. [Jest Documentation](https://jestjs.io/docs/getting-started)
6. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## License

[MIT](LICENSE)