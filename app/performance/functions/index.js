import { onFID, onFCP, onINP, onCLS, onLCP, onTTFB} from "web-vitals/attribution";

export const getWebVitals = () => {


  const startFcp = () =>
    new Promise((rs) => {
      onFCP(rs, { reportAllChanges: true });
    });

  const startFid = () =>
    new Promise((rs) => {
      onFID(rs, { reportAllChanges: true });
    });

  const startINP = () =>
    new Promise((rs) => {
      onINP(rs, { reportAllChanges: true });
    });

  const startCLS = () =>
    new Promise((rs) => {
      onCLS(rs, { reportAllChanges: true });
    });

  const startLCP = () =>
    new Promise((rs) => {
      onLCP(rs, { reportAllChanges: true });
    });

  const startTFB = () =>
    new Promise((rs) => {
      onTTFB(rs, { reportAllChanges: true });
    });
  Promise.all([
 startFcp(),
    startFid(),startINP(),
    startCLS(),
    startLCP(),
    startTFB()
  ]).then(console.log);
   
    

};