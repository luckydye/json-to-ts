// json to ts interface

const parseObjectLayers = (jsonObject: any) => {
  let string = "";

  for (let key in jsonObject) {
    if (jsonObject[key] instanceof Object) {
      string += `${key}: {\n`;
      string += `\t${parseObjectLayers(jsonObject[key])}`;
      string += `};\n`;
    } else {
      string += `\t${key}: ${typeof jsonObject[key]};\n`;
    }
  }

  return string;
};

const praseObject = (object: any, name: string) => {
  let string = `interface ${name} {\n`;
  string += `${parseObjectLayers(object)}`;
  string += `}`;
  return string;
};

function run() {
  try {
    const data = JSON.parse(json_text.value);
    const int = praseObject(data, json_text_name.value);
    ts_text.innerHTML = int;
  } catch (err) {
    error.innerText = err.message;
    console.error(err);
  }
}

window.onload = () => {
  json_text.oninput = () => {
    localStorage.setItem("json_input", json_text.value);

    run();
  };

  if (localStorage.getItem("json_input")) {
    json_text.value = localStorage.getItem("json_input");
    run();
  }
};
