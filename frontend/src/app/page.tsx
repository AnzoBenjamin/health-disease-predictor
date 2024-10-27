import type { NextPage } from 'next';
import Head from 'next/head';
import HeartDiseasePredictor from "@/components/forms/HeartDiseasePredictor";

const Home: NextPage = () => {
  return (
      <div>
        <Head>
          <title>Heart Disease Predictor</title>
          <meta name="description" content="Predict heart disease risk based on health indicators" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="min-h-screen bg-gray-50 py-8">
          <HeartDiseasePredictor />
        </main>

        <footer className="py-4 text-center text-sm text-gray-600">
          Built with Next.js and Flask
        </footer>
      </div>
  );
};

export default Home;