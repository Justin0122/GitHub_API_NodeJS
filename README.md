# GitHub_API_NodeJS

This Node.js API project utilizes Express, the GitHub API, and caching to fetch public repositories, their respective languages, and user-specific READMEs from GitHub profiles.

## Overview

This Node.js API, built with Express, GitHub API integration, and caching, serves as a centralized data-fetching service for a personal portfolio website. The primary motivation behind creating this API was to streamline and centralize the process of retrieving specific data—such as public repositories, languages used, and READMEs—from GitHub.


## Features

- Fetch public repositories
- Retrieve languages used in repositories
- Fetch user-specific README from GitHub profiles

## Prerequisites

- Node.js
- GitHub API credentials (optional but recommended for higher rate limits)

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables.
``` bash
GITHUB_USERNAME=your_username
GITHUB_TOKEN=your_token
```
4. Start the server: `npm start`.


## Endpoints

- `/repositories`: Fetch public repositories.
- `/readme/:username`: Fetch README. The `:username` parameter is optional; if not provided, the default username from environment variables will be used.

## Technologies Used

- Node.js
- Express
- GitHub API


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
