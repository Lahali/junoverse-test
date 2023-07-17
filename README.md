This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Star Wars App

A sample application that consumes data from the Star Wars API and displays it on the screen. The application is built using Next.js 13, TypeScript, and Jest for testing.

## Features

- Displays data from various categories of the Star Wars saga, such as planets, starships, vehicles, people, films, and species.
- Implements pagination to load more items for each category.
- Allows viewing the details of each item on an individual page.
- Fully responsive for an optimal user experience on both mobile and desktop devices.

## Technologies Used

- [Next.js 13](https://nextjs.org/): A React framework for building scalable and high-performance web applications.
- [TypeScript](https://www.typescriptlang.org/): A programming language that extends JavaScript with static types.
- [Jest](https://jestjs.io/): A JavaScript testing framework.
- [SWAPI (Star Wars API)](https://swapi.dev/) (Star Wars API): An API that provides data related to the Star Wars universe.

## Development Setup

Follow these steps to set up the development environment:

1. Clone the repository: **git clone https://github.com/your-username/star-wars-app.git**
2. Navigate to the project directory: **cd star-wars-app**
3. Install the dependencies: **npm install**

## Running the Development Server

To start the development server, run the following command:

```bash
Copy code
npm run dev

# or

yarn dev

# or

pnpm dev

```

Open **http://localhost:3000** with your browser to see the result.

## Running Tests

Automated tests have been included using Jest to ensure code quality. To run the tests, use the following command:

```bash
Copy code
npm run test
```

## Contributions

Contributions are welcome. If you would like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a branch for your contribution: git checkout -b feature/new-feature.
3. Make your modifications and commit: git commit -m "Add new feature".
4. Push your changes to the remote repository: git push origin feature/new-feature.
5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
