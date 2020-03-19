import React from "react";
import {
  ExcelExport,
  ExcelExportColumn
} from "@progress/kendo-react-excel-export";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import i18n from "../components/I18n";

class ExportExcelKendoCustom extends React.Component {
  _exporter;
  export = () => {
    this.save(this._exporter);
  };
  save = component => {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;

    let altIdx = 0;
    rows.forEach(row => {
      if (row.type === "data") {
        if (altIdx % 2 !== 0) {
          row.cells.forEach(cell => {
            cell.background = "#aabbcc";
            cell.border = "1px solid #aabbcc";
          });
        } else {
          row.cells.forEach(cell => {
            cell.background = "#FFFFFF";
          });
        }
        altIdx++;
      }
    });

    component.save(options);
  };
  static props = {
    fileName: PropTypes.string,
    data: PropTypes.array,
    columns: PropTypes.array,
    styleData: PropTypes.object,
    btnName: PropTypes.string,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    fileName: "Download",
    columns: [],
    data: [],
    btnName: "Download",
    disabled: false
  };
  render() {
    const { fileName, data, btnName, disabled } = this.props;
    return (
      <div>
        <Button
          size="sm"
          color="primary"
          onClick={this.export}
          disabled={disabled}
        >
          <i className="fa fa-dot-circle-o" /> {btnName}
        </Button>

        <ExcelExport
          data={data}
          fileName={fileName}
          ref={exporter => {
            this._exporter = exporter;
          }}
        >
          <ExcelExportColumn
            headerCellOptions={{ background: "#008080" }}
            field="id"
            title={i18n.t("layout_common.id")}
          />
          <ExcelExportColumn
            headerCellOptions={{ background: "#008080" }}
            field="code"
            title={i18n.t("bill.code")}
            width={100}
          />
          <ExcelExportColumn
            headerCellOptions={{ background: "#008080" }}
            field="name"
            title={i18n.t("bill.product")}
            width={200}
          />
          <ExcelExportColumn
            headerCellOptions={{ background: "#008080" }}
            field="0"
            title={i18n.t("bill.amount")}
            width={100}
            cellOptions={{
              borderRight: "#778899",
              borderLeft: "#778899"
            }}
          />
          <ExcelExportColumn
            headerCellOptions={{ background: "#008080" }}
            field="price"
            title={i18n.t("bill.price")}
            width={100}
          />
          <ExcelExportColumn
            headerCellOptions={{ background: "#008080" }}
            field="point"
            title={i18n.t("layout_common.point")}
            width={100}
          />
        </ExcelExport>
      </div>
    );
  }
}

export default ExportExcelKendoCustom;
