import React from "react";
import {
  ExcelExport,
  ExcelExportColumn
} from "@progress/kendo-react-excel-export";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

import i18n from "../components/I18n";

class ExportKendo extends React.Component {
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
    btnName: PropTypes.string,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    fileName: "Download",
    data: [],
    btnName: "Download",
    disabled: false
  };
  render() {
    const { disabled, fileName, data, btnName } = this.props;
    return (
      <div>
        <Button
          size="sm"
          color="primary"
          disabled={disabled}
          onClick={this.export}
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
            field="0"
            title={i18n.t("layout_manager_user.member_code")}
            width={150}
          />
          <ExcelExportColumn
            headerCellOptions={{ background: "#008080" }}
            field="0"
            title={i18n.t("layout_manager_user.fullname")}
            width={100}
          />
        </ExcelExport>
      </div>
    );
  }
}

export default ExportKendo;
