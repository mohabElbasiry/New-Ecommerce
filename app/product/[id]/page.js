"use client";
import React, { useEffect } from "react";
import ProductContainer from "./components/productContainer";
import DynamicTable from "./components/DynamicTable";
import { data, dataVariants, variants } from "./data";
import { generateQualities, shapeData } from "./functions/fun";




// const navigationTiming = performance.getEntriesByType('navigation')[0];

// // Capture resource timings
// const resourceTimings = performance.getEntriesByType('resource');
function sendPerformanceData(data) {
  console.log(data);
  // fetch('https://your-dashboard-server.com/api/performance', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })
  // .then(response => response.json())
  // .then(result => console.log('Performance data sent successfully:', result))
  // .catch(error => console.error('Error sending performance data:', error));
}
export default function EditProductPage({ searchParams }) {
  let shapedData = generateQualities([], variants, true, shapeData);

  // useEffect(() => {
  //   const getData = () => {
  //     onCLS(console.log, { reportAllChanges: true });
  //     onINP(console.log, { reportAllChanges: true });
  //     onLCP(console.log, { reportAllChanges: true });
  //     const { performance } = window;
  //     const timing = window.performance.timing;
  //     console.log(
  //       "Page Load Time:",
  //       timing.loadEventEnd - timing.navigationStart
  //     );
  //     console.log(
  //       "Navigation Timing:",
  //       performance.getEntriesByType("navigation")
  //     );
  //     console.log("Resource Timing:", performance.getEntriesByType("resource"));

  //     const resources = performance.getEntriesByType("resource");
  //     resources.forEach((resource) => {
  //       console.log(`${resource.name} took ${resource.duration}ms to load`);

  //       performance.mark("start");
  //       // Your code here
  //       performance.mark("end");
  //       performance.measure("myMeasure", "start", "end");
  //       const measure = performance.getEntriesByName("myMeasure")[0];
  //       console.log("Custom Measure:", measure.duration);
  //     });
  //   };

  //   if (window && document) getData();
  // }, []);

  //
  //   const performanceData = {
  //     navigationTiming: {
  //       loadTime: navigationTiming.loadEventEnd - navigationTiming.navigationStart,
  //       domInteractive: navigationTiming.domInteractive - navigationTiming.navigationStart,
  //     },
  //     resourceTimings: resourceTimings.map(entry => (entry)),
  //     webVitals: {},
  //   };

  //   onCLS((metric) => {
  //     performanceData.webVitals.cls = metric.value;
  //     // sendPerformanceData(performanceData);
  //   });
  //   // onFID((metric) => {
  //   //   performanceData.webVitals.fid = metric.value;
  //   //   sendPerformanceData(performanceData);
  //   // });
  //   onLCP((metric) => {
  //     performanceData.webVitals.lcp = metric.value;
  //     // sendPerformanceData(performanceData);

  //   })
  //   ;

  //   sendPerformanceData(performanceData);
  //
   useEffect(() => {   getWebVitals();

    setTimeout(() => {
       getWebVitals();
    }, 2000);
   }, []);
  return (
    <div>
      <ProductContainer
        product={dataVariants.product}
        searchParams={searchParams}
      />

      <DynamicTable data={data} />
      {/* {shapedData?.map((parent) => (
        <div className="w-[90%] mx-auto" key={parent?.itemIndex}>
          <h1>{parent?.key}</h1>
          <div className="w-[90%] mx-auto grid gap-2">
            {parent?.value.map((child) => (
              <div className="w-[90%] mx-auto" key={child.itemIndex}>
                {child?.val}
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
}
