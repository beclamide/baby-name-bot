import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [sexInput, setSexInput] = useState("male");
  const [animalInput, setAnimalInput] = useState("human");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sex: sexInput, animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Baby Name AI Bot</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>

      <main className={styles.main}>
        <h3>Name my baby {animalInput}</h3>
        <p>The AI-Powered Baby Name Generator</p>
        <form onSubmit={onSubmit}>
          <select onChange={(e) => setSexInput(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
          <select onChange={(e) => setAnimalInput(e.target.value)}>
            <option value="human">Human</option>
            <option value="squirrel">Squirrel</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="elf">Elf</option>
            <option value="wizard">Wizard</option>
            <option value="god">God</option>
          </select>
          <input type="submit" value="Generate some names" disabled={loading === true ? true : false} />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
