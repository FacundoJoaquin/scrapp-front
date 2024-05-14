import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import Card from "../ui/Card";
import { motion, useScroll } from "framer-motion";

const Alquileres = () => {
  const [data, setData] = useState(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fetch = async () => {
      const colRef = collection(db, "alquileres");
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => doc.data());
      setData(data);
      return data;
    };

    fetch();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className="mt-20 grid grid-cols-4 gap-20 mb-10">
      {data &&
        data.map((e, i) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              key={i}
            >
              <Card data={e} />
            </motion.div>
          );
        })}
    </section>
  );
};

export default Alquileres;
