import { useState, InputHTMLAttributes } from "react";


//Вот код для решения задачи в одном файле, как указано в задаче.




// Интерфейсы для типов данных
interface Param {
  id: number;
  name: string;
  type: "string";
  //todo пример расширения 
  // type: "string" | "select" | "number";
  // options?: string[];
}

interface ParamValue {
  paramId: number;
  value: string;
  //todo пример расширения 
  // value: string | number;
}

interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface Props {
  params: Param[];
  model: Model;
}


// Компонент TextInput
const TextInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ type = "text", ...rest }) => <input type={type} {...rest} />


// Функция для рендеринга правильного поля ввода в зависимости от типа параметра
const renderInputField = (param: Param, value: string, onChange: (value: string) => void) => {
  const inputTypes = {
    string: (
      <TextInput value={String(value)} onChange={(e) => onChange(e.target.value)} />
    ),
    //todo пример расширения 
    // number: (
    //   <TextInput type="number" value={value} onChange={(e) => onChange(e.target.value)} />
    // ),
    // select: (
    //   <select value={String(value)} onChange={(e) => onChange(e.target.value)}>
    //     {param?.options?.map((option, index) => (
    //       <option key={index} value={option}>
    //         {option}
    //       </option>
    //     ))}
    //   </select>
    // ),
  };

  return inputTypes[param.type] || null;
};


// Компонент ParamEditor
const ParamEditor: React.FC<Props> = ({ params, model }) => {

  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);


  const handleChange = (paramId: number, value: string) => {
    setParamValues((prevValues) =>
      prevValues.map((p) =>
        p.paramId === paramId ? { ...p, value } : p
      )
    );
  };

  //  все проставленные значения параметров виден в console
  const getModel = (): void => {
    console.log({
      paramValues,
      colors: model.colors,
    });
  }

  return (
    <>
      {params?.map((param) => (
        <div key={param.id}>
          <label>{param.name}:</label>
          {renderInputField(
            param,
            paramValues.find((p) => p.paramId === param.id)?.value || "",
            (value) => handleChange(param.id, value))}
        </div>
      ))}
      <button onClick={getModel}>Get Model</button>
    </>
  );
};



// Главный компонент приложения
function App() {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
    //todo пример расширения 
    // { id: 3, name: "Age", type: "number" },
    // { id: 4, name: "Color", type: "select", options: ["Red", "Blue", "Green"] }
  ];

  const model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
      //todo пример расширения 
      // { paramId: 3, value: 30 },
      // { paramId: 4, value: "Red" }
    ],
    colors: ["red", "blue"]
  };

  return (
    <div className="App">
      <h1>Param Editor</h1>
      <ParamEditor params={params} model={model} />
    </div>
  );
}

export default App;
