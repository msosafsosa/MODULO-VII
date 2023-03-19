import React from "react";
import "./App.css";

import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import "handsontable/dist/handsontable.full.css";

// ejecutar para obtener todas las funciones de handsontable
registerAllModules();
registerLanguageDictionary(esMX);

function App() {
  const [usuarios, setUsuarios] = React.useState([]);

  const hotTableComponent = React.useRef(null);

  React.useEffect(() => {
    function getData() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => setUsuarios(data));
    }

    getData();
  }, []);

  const descargarArchivo = () => {
    const pluginDescarga =
      hotTableComponent.current.hotInstance.getPlugin("exportFile");

    pluginDescarga.downloadFile("csv", {
      filename: "usuarios",
      fileExtension: "csv",
      mimeType: "text/csv",
      columnHeaders: true,
    });
  };

  return (
    <div>
      <h2>Final del Modulo VII</h2>
      <button onClick={() => descargarArchivo()}>Descargar lista completa en un Archivo</button>
      {usuarios && (
        <HotTable
          ref={hotTableComponent}
          language={esMX.languageCode} // usamos el lenguaje espanol, para el menu contextual
          data={usuarios}
          licenseKey="non-commercial-and-evaluation"
          colHeaders={true} // nombres de cada columna
          rowHeaders={true} // numeracion de cada fila
          columnSorting={true} // funcion para ordenar colunmas ascendente o descendente
          mergeCells={true} // para combinar las celdas.
          contextMenu={["row_above", "row_below"]} //menu contextual con el click derecho, 
          readOnly={false}
        >
          <HotColumn data="id" readOnly={true} />
          <HotColumn data="name" title="Nombre" />
          <HotColumn data="username" title="Usuario" />
          <HotColumn data="email" />
          <HotColumn data="address.street" />
          <HotColumn data="address.city" />
        </HotTable>
      )}
    </div>
  );
}

export default App;
