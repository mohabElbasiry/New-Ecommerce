"use client";
import { useState } from "react";
import Headercomponent from "./headercomponent";
import { ProductDetailsComponent } from "./productDetailsComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BasicFormValidation } from "./productDetailsComponents/BasicFormValidationSchema";
import { ProductMainDefaultValue } from "../constants/DefaultProductMainValue";
import { produce } from "immer";
import { generateQualities } from "./productVariations/collapseView/functions/GenerateQualities";
import { shapeData } from "./productVariations/collapseView/functions/datashape";
import TourGuide from "@/components/GlobalUi/TourGuide";
import { BottomBar } from "./bottombar";
// import { List } from "./productImages/dragableImages";

const List = [
  {
    name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxljCiU3pRUXpw-39aklTNk7BDV3G9Dn7ocw&s",
    order: 0,
    id: "@das",
  },
  {
    name: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    order: 1,
    id: "@das",
  },

  {
    name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAAVs2PLdsJq87FS_r_s6_jbpGmcGcI9ZXvg&s",
    order: 2,
    id: "@das",
  },
  {
    name: "https://media.springernature.com/lw703/springer-static/image/art%3A10.1038%2F528452a/MediaObjects/41586_2015_Article_BF528452a_Figg_HTML.jpg",
    order: 3,
    id: "@das",
  },
  {
    name: "https://www.w3schools.com/w3images/lights.jpg",
    order: 4,
    id: "@das",
  },
  {
    name: "https://www.w3schools.com/w3images/nature.jpg",
    order: 5,
    id: "@das",
  },
  {
    name: "https://www.w3schools.com/w3images/mountains.jpg",
    order: 6,
    id: "@das",
  },
];

export const ProductAddMaim = () => {
  const [submitedData, setSubmitedData] = useState({
    ...ProductMainDefaultValue,
  });
  const [history, setHistory] = useState([ProductMainDefaultValue]);
  const [data, setData] = useState({
    Data: [],
    BeforeFilterData: [],
  });
  console.log(submitedData,'submitedDatasubmitedData');
  // useMemo(() => {
  //   const maximumLength = 20;
  //   setHistory((prev) => {
  //     if (changeonHistory === false) {
  //       console.log("object");

  //       if (prev?.length === maximumLength) {
  //         const deleteFirstTenELements = prev.slice(10);
  //         return [...deleteFirstTenELements, submitedData];
  //       }
  //       return [...(prev ?? []), submitedData];
  //     } else {
  //       console.log("object");
  //       return prev;
  //     }
  //   });
  // }, [submitedData?.productvaritions, changeonHistory]);

  // useEffect(() => {
  //   setSubmitedData(
  //     produce((draft) => {
  //       draft.productDetails.images = List.map((item, idx) => ({
  //         name: item.name,
  //         order: idx,
  //         idx,
  //       }));
  //     })
  //   );
  // }, []);
  const dataSteps = [
    {
      key: "steps Variant",
      value: [
        {
          target: ".add-product-variant",
          content: "click here to add product variant ",
        },
        {
          content: <h2>will create Variant </h2>,

          placement: "center",
          target: ".my-other-step",
        },
        {
          target: ".add-name-variant",
          content: "enter here to add name variant",
        },
        {
          target: ".add-values-variant",
          content: "enter here to add values variant",
        },
        {
          target: ".done-variant",
          content: "click here to create the first variant",
        },
        {
          content: "now create variant done ",
          target: ".product-variant",
        },
      ],
      FunctionSteps: ({ index }) => {
        if (index == 1) {
          console.log("object");
          setSubmitedData(
            produce((draft) => {
              if (draft?.productvaritions?.variants?.length >= 1) {
                return;
              } else {
                draft?.productvaritions?.variants?.push({
                  isColor: "",

                  key_en: "colors",
                  key_ar: "colors",
                  isTest: true,
                  values: [
                    {
                      value_ar: "red",
                      value_en: "red",
                      color: "",
                    },
                    {
                      value_ar: "blue",
                      value_en: "blue",
                      color: "",
                    },
                  ],
                  edit: true,
                });
              }
            })
          );
        } else if (index == 5) {
          setSubmitedData(
            produce((draft) => {
              const Updated = draft.productvaritions.variants?.map((item) => ({
                ...item,
                edit: false,
              }));
              console.log(Updated, "UpdatedUpdated");
              draft.productvaritions.variants = Updated;
              draft.productvaritions.REfvariants = Updated;
              const dataShape = generateQualities(
                draft.productvaritions.varitionsValues?.flatMap(
                  (item) => item.values
                ) || [],
                Updated || []
              );
              draft.productvaritions.varitionsValues = shapeData(
                dataShape || [],
                Updated || []
              );
            })
          );
        }
      },

      FunctionLastSteps: () => {
        setSubmitedData(
          produce((draft) => {
            const Updated = draft.productvaritions.variants?.filter(
              (item) => !item.isTest
            );
            console.log(Updated, "UpdatedUpdated");
            draft.productvaritions.variants = Updated;
            draft.productvaritions.REfvariants = Updated;

            draft.productvaritions.varitionsValues = Updated;
          })
        );
      },
    },
    {
      key: "stepsOther",
      value: [
        {
          target: ".my-other-step",
          content: "This another awesome feature!",
        },
      ],
    },
  ];
  console.log("Mohamed Salah::: ", submitedData);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(BasicFormValidation("en")),
  });
  return (
    <>
      <TourGuide stepsData={dataSteps} />
      <Headercomponent handleSubmit={handleSubmit}>
        <div className="  items-end justify-end  gap-1">
          <ProductDetailsComponent
            submitedData={submitedData}
            setSubmitedData={setSubmitedData}
            formData={{
              register,
              reset,
              setValue,
              getValues,
              errors,
              setError,
              clearErrors,
              isSubmitting,
            }}
            data={data}
            setData={setData}
          />
        </div>
        <BottomBar
          setHistory={setHistory}
          history={submitedData?.history}
          setSubmitedData={setSubmitedData}
        />
      </Headercomponent>
    </>
  );
};
