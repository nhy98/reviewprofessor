/**
 * @author thucvv6955
 */
import React, { Component } from "react";
import ReactExport from "react-data-export";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import dataUtils from "../../utils/DataUtils";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function sheet(columns, styleColum, data, styleData) {
  console.log("style COlumn =======");
  console.log(styleColum);

  let coVal = [];
  if (columns.length > 0)
    for (let i = 0; i < columns.length; i++) {
      coVal.push({
        value: columns[i],
        style: styleColum
      });
    }
  let dataVal = [];
  dataVal.push(coVal);
  if (data.length > 0)
    for (let i = 0; i < data.length; i++) {
      dataVal.push(dataUtils.convertDataExcel(data[i], styleData));
    }
  let multiDataSet = [
    {
      columns: [],
      data: dataVal
    }
  ];

  return multiDataSet;
}

class ExportExcel extends Component {
  static props = {
    fileName: PropTypes.string,
    columns: PropTypes.array,
    styleColum: PropTypes.object,
    data: PropTypes.array,
    styleData: PropTypes.object,
    element: PropTypes.any
  };
  static defaultProps = {
    fileName: "Download",
    columns: [],
    styleColum: {
      font: { sz: "14", bold: true },
      fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } }
    },
    data: [],
    styleData: {},
    element: (
      <Button size="sm" color="primary">
        <i className="fa fa-dot-circle-o" /> Download
      </Button>
    )
  };
  render() {
    const {
      columns,
      fileName,
      styleColum,
      data,
      styleData,
      element
    } = this.props;
    return (
      <div>
        <ExcelFile filename={fileName} element={element}>
          {data.length > 0
            ? data.map((newData, index) => (
                <ExcelSheet
                  key={index}
                  dataSet={sheet(columns, styleColum, newData, styleData)}
                  name={`Sheet${index + 1}`}
                />
              ))
            : null}
        </ExcelFile>
      </div>
    );
  }
}

export default ExportExcel;
