# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Set up environment variables**:
    -   Rename the `.env.example` file to `.env`.
    -   Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Add your API key to the `.env` file:
        ```
        GEMINI_API_KEY="YOUR_API_KEY_HERE"
        ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Follow these steps:

1.  **Push to GitHub**: Push your code to a new GitHub repository.
2.  **Import Project on Vercel**: Go to your [Vercel dashboard](https://vercel.com/new) and import the project from your GitHub repository. Vercel will automatically detect that you are using Next.js and configure the build settings.
3.  **Add Environment Variables**: In your Vercel project settings, navigate to the "Environment Variables" section. Add your `GEMINI_API_KEY` with the value you obtained from Google AI Studio.
4.  **Deploy**: Vercel will automatically trigger a deployment when you push new commits to your repository.
