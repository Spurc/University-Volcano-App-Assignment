import React from "react";

//Renders the main home page.
export default function Home() {
    return (
      <main>
        <VolcanoHome />
      </main>
    );
  }
  
  //Content of the home page. This is rendered above.
  const VolcanoHome = () => (
    <section className = "home">
      <div className = "homeContent">
        <h1 className = "homeTitle">Volcanoes of the World!</h1>
      </div>
    </section>
  );  
  