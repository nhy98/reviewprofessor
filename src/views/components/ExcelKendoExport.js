import * as React from "react";

import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup
} from "@progress/kendo-react-excel-export";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
//import { aggregateBy, process } from '@progress/kendo-data-query';
// import products from "./products.json";

//const aggregates = [ { field: 'UnitPrice', aggregate: 'sum' } ];
//const group = [ { field: 'Discontinued', aggregates: aggregates } ];
// const data = products;
//const total = aggregateBy(products, aggregates);

//const CustomGroupHeader = (props) => (`Discontinued: ${props.value}`);

//const CustomGroupFooter = (props) => (`SUM: \$ ${(props.aggregates.UnitPrice.sum).toFixed(2)}`);

class ExcelKendoExport extends React.Component {
  _exporter;
  export = () => {
    this._exporter.save();
  };
  static props = {
    fileName: PropTypes.string,
    columns: PropTypes.array,
    styleColum: PropTypes.object,
    data: PropTypes.array,
    styleData: PropTypes.object,
    btnName: PropTypes.string
  };
  static defaultProps = {
    fileName: "Download",
    columns: [],
    data: [],
    btnName: "Download"
  };
  render() {
    const { fileName, btnName, data } = this.props;
    return (
      <div>
        <Button onClick={this.export}>
          <i className="fa fa-dot-circle-o" /> {btnName}
        </Button>

        <ExcelExport
          data={data}
          //group={group}
          fileName={fileName}
          ref={exporter => {
            this._exporter = exporter;
          }}
        >
          <ExcelExportColumn
            footerCellOptions={{ color: "green" }}
            headerCellOptions={{
              background: "white",
              wrap: true,
              color: "red",
              textAlign: "center"
            }}
            field="ProductID"
            title="Product ID"
            locked
            width={200}
          />
          <ExcelExportColumn
            field="ProductName"
            title="Product Name"
            width={350}
          />

          <ExcelExportColumnGroup
            title="Availability"
            headerCellOptions={{ textAlign: "center" }}
          >
            <ExcelExportColumn
              field="UnitPrice"
              title="Price"
              cellOptions={{ format: "$#,##0.00" }}
              width={150}
              footerCellOptions={{ wrap: true, textAlign: "center" }}
              groupFooterCellOptions={{ textAlign: "right" }}
              // groupFooter={CustomGroupFooter}
              //footer={CustomFooter}
            />
            <ExcelExportColumn field="UnitsOnOrder" title="Units on Order" />
            <ExcelExportColumn field="UnitsInStock" title="Units in Stock" />
          </ExcelExportColumnGroup>
        </ExcelExport>
      </div>
    );
  }
}

export default ExcelKendoExport;
