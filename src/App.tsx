import { getApiFruit } from "./utils/get-api";

import { IComment, comments } from "./types/api-comment";

import "./App.css";

function App() {
  const buahImport: { [key: string]: number } = {};
  const buahLocal: { [key: string]: number } = {};

  getApiFruit().forEach((i) => {
    if (i.fruitType == "IMPORT") {
      const fruitNameLowerCase = i.fruitName.toLowerCase();
      if (buahImport[fruitNameLowerCase] == undefined) {
        buahImport[fruitNameLowerCase] = i.stock;
      } else {
        buahImport[fruitNameLowerCase] += i.stock;
      }
    } else if (i.fruitType == "LOCAL") {
      const fruitNameLowerCase = i.fruitName.toLowerCase();
      if (buahLocal[fruitNameLowerCase] == undefined) {
        buahLocal[fruitNameLowerCase] = i.stock;
      } else {
        buahLocal[fruitNameLowerCase] += i.stock;
      }
    }
  });

  const FruitNameList = () => {
    return getApiFruit().map((item, index) => {
      return (
        <div
          className="max-w-xs rounded-md bg-antiqwhite Agent-card "
          key={index}
        >
          <div className="m-1 Fruits-name">- {item.fruitName}</div>
        </div>
      );
    });
  };

  const FruitTypeListImport = () => {
    return Object.keys(buahImport).map((item) => {
      return (
        <div className="flex ">
          <div>
            - {item} {buahImport[item]}
          </div>
        </div>
      );
    });
  };

  const FruitTypeListLocal = () => {
    return Object.keys(buahLocal).map((item) => {
      return (
        <div className="flex">
          <div>
            - {item} {buahLocal[item]}
          </div>
        </div>
      );
    });
  };

  const ShowCommentCount = () => {
    const commentCount = (comments: IComment[], result: number) => {
      result = 0;
      for (let i = 0; i < comments.length; i++) {
        result += 1;
        if (comments[i].replies !== undefined) {
          result += commentCount(comments[i].replies!, result);
        }
      }
      return result;
    };
    return <div>{commentCount(comments, 0)}</div>;
  };

  return (
    <>
      <h1 className="mb-7">Ryan Adytia</h1>

      <div className="flex flex-wrap gap-4">
        <div className="max-w-xs p-3 text-black rounded-md card-wrapper bg-antiqwhite">
          <div className="mt-2 text-xl">
            Buah-buah yang dimiliki oleh Andi adalah:
          </div>
          <div className="justify-start">
            <FruitNameList />
          </div>
        </div>
        <div className="max-w-xs p-3 text-black rounded-md card-wrapper bg-antiqwhite">
          <div className="mt-2 mb-2 text-xl">
            Buah-buah yang ada di masing-masing wadah:
          </div>
          <div className="flex flex-row justify-center gap-2 ">
            <div className="w-full p-2 border-2 border-solid rounded-lg border-sky-500 ">
              <FruitTypeListImport />
            </div>
            <div className="w-full p-2 border-2 border-solid rounded-lg border-sky-500 ">
              <FruitTypeListLocal />
            </div>
          </div>
        </div>
        <div className="max-w-xs p-3 text-black rounded-md card-wrapper bg-antiqwhite">
          <div className="mt-2 mb-2 text-xl">
            Total komentar yang ada adalah:
          </div>
          <div>
            <ShowCommentCount />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
