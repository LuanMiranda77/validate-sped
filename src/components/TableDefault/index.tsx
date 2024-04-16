import { CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { formatMoney } from "../../utils/format";

export type Column = {
  caption: string;
  dataField: string;
  type?: "string" | "date" | "decimal" | "currency" | "number";
  align?: "left" | "center" | "right";
  className?: string;
  size?: number;
  isCheck?: boolean;
  cellRender?: (e: any) => React.ReactNode;
};

interface Props {
  data: Array<any>;
  columns: Array<Column>;
  height?: string;
  maxHeight?: string;
  loading: boolean;
  isMultiSelect?: boolean;
  onChangeSelect?: (e: any) => void;
  rowsSelect?: any;
}

const TableDefault: React.FC<Props> = (props) => {
  const { colors } = useContext(ThemeContext);

  function chekcedAll() {
    if (props.onChangeSelect && props.rowsSelect) {
      props.rowsSelect.length == 0 || props.rowsSelect.length < props.data.length
        ? props.onChangeSelect(props.data)
        : props.onChangeSelect([]);
    }
  }

  function chekcedUnit(row: any) {
    if (props.onChangeSelect && props.rowsSelect) {
      let index = props.rowsSelect.indexOf(row);
      let list = [...props.rowsSelect];

      if (index == -1) {
        list.push(row);
      } else {
        list.splice(index, 1);
      }
      props.onChangeSelect(list);
    }
  }

  return (
    <>
      {props.isMultiSelect &&  <div className="font-bold w-full text-xs pt-2">
        {props.rowsSelect && props.rowsSelect?.length == 0
          ? `Quantidade do lista (${props.data?.length})`
          : `Selecionados ${props.rowsSelect?.length} de ${props.data?.length}`}
      </div>}

      <TableContainer
        component={Paper}
        style={{
          maxHeight: props.maxHeight ? props.maxHeight : "calc(100vh - 155px)",
          height: props.height ? props.height : "calc(100vh - 155px)",
        }}
      >
        {props.data.length == 0 ? (
          props.loading ? (
            <div
              className="w-full flex flex-col justify-center items-center"
              style={{
                height: props.height ? props.height : "calc(100vh - 155px)",
              }}
            >
              <CircularProgress sx={{ color: colors.primary }} />
              <span className="font-bold mt-2">Carregando...</span>
            </div>
          ) : (
            <div
              className="w-full flex flex-col justify-center items-center"
              style={{
                height: props.height ? props.height : "calc(100vh - 155px)",
              }}
            >
              <span className="font-bold mt-2">Sem dados!</span>
            </div>
          )
        ) : (
          <>
            <Table stickyHeader aria-label="simple table">
              <TableHead style={{height:'20px'}}>
                <TableRow>
                  {props.isMultiSelect && (
                    <TableCell
                      style={{
                        background: colors.primary,
                        color: colors.white,
                        width: "50px",
                        height:'20px !important'
                      }}
                      align={"center"}
                    >
                      <input type="checkbox" onChange={chekcedAll}></input>
                    </TableCell>
                  )}

                  {props.columns.map((col, index) => (
                    <TableCell
                      key={index}
                      style={{
                        background: colors.primary,
                        color: colors.white,
                        width: col.size ? col.size : "",
                        height:'20px !important'
                      }}
                      align={col.align}
                    >
                      {col.caption}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((row) => (
                  <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    {props.isMultiSelect && (
                      <TableCell
                        style={{
                          width: "50px",
                        }}
                        align={"center"}
                      >
                        <input
                          type="checkbox"
                          onChange={() => chekcedUnit(row)}
                          checked={props.rowsSelect.indexOf(row) != -1}
                        />
                      </TableCell>
                    )}
                    {props.columns.map((col, colIndex) => {
                      let text = row[col.dataField];
                      if (col.type) {
                        if (col.type === "date") {
                          text = moment(row[col.dataField]).format("DD/MM/YYYY");
                        } else if (col.type === "decimal") {
                          text = formatMoney(row[col.dataField]);
                        } else if (col.type === "currency") {
                          text = "R$ " + formatMoney(row[col.dataField]);
                        }
                      }

                      return (
                        <>
                          {col.cellRender ? (
                            <TableCell key={colIndex} align={col.align}>
                              {col.cellRender({
                                column: col,
                                row: row,
                                value: row[col.dataField],
                              })}
                            </TableCell>
                          ) : (
                            <TableCell key={colIndex} align={col.align}>
                              {<span className={col.className}>{text}</span>}
                            </TableCell>
                          )}
                        </>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </TableContainer>
    </>
  );
};

export default TableDefault;
