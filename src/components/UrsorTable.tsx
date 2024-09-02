import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Stack } from '@mui/material';
import { IActionPopupItem } from './ActionPopup';
import { alpha } from '@mui/system';
import UrsorActionButton from './UrsorActionButton';
import { ReactComponent as ArrowDownIcon } from './../images/ArrowDownIcon.svg';
import _ from 'lodash';
import { PALETTE, Typography } from './../ui';
import dayjs from 'dayjs';
import NewActivityTag from './NewActivityTag';
import {
  IUrsorDropdownButtonProps,
  UrsorDropdownButton,
} from './UrsorDropdown';

export const FONT_SIZES = {
  normal: '22px',
  medium: '14px',
};

const GLASS_WHITE_STROKE = 'rgba(251, 251, 251, 0.35)';

const ROW_HEIGHT = '55px';
const BORDER_THICKNESS = '1.5px';
const BORDER = `${BORDER_THICKNESS} solid ${PALETTE.secondary.grey[2]}`;
const ROUNDING = '12px';
const BODY_CELL_Y_PADDING = '13px';
const CELL_BUTTON_SIZE = '16px';
const NEW_TAG_DURATION = 8;

export interface IUrsorTableColumn {
  name: string;
  displayName: string;
  getAvatar?: (id: string) => JSX.Element;
  itemDisplay?: (item: any) => string | number | JSX.Element;
  faded?: (row: any) => boolean;
  getButton?: (row: any) => IUrsorTableCellSimpleButton;
  getListButton?: (item: any) => IUrsorTableCellListButton;
  getActionButtonItems?: (id: string) => IActionPopupItem[];
  headerButton?: JSX.Element;
  checkbox?: boolean;
  sortable?: boolean;
  selectAll?: boolean;
  link?: boolean;
  newTag?: boolean;
  urlPopover?: boolean;
  noRowClick?: boolean;
  getExtraElement?: (id: string, hovering: boolean) => JSX.Element;
}

interface IUrsorTableCellButton {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface IUrsorTableCellSimpleButton extends IUrsorTableCellButton {
  callback: () => void;
}

interface IUrsorTableCellListButton extends IUrsorTableCellButton {
  rows: IUrsorDropdownButtonProps['rows'];
  showCount?: boolean;
}

export interface IUrsorTableRow<T extends Record<string, any>> {
  id: string;
  items: T;
  tags: string[];
  url?: string;
  newTagDatetime?: string;
  disabled: boolean;
}

export interface IUrsorTableProps<T extends Record<string, any>> {
  columns: IUrsorTableColumn[];
  rows: IUrsorTableRow<T>[];
  tagColumnName?: string;
  getActionButtonItems?: (rowId: string) => IActionPopupItem[];
  getEndButton?: (rowId: string) => JSX.Element;
  defaultSortedByColumn?: string;
  defaultSortedAscending?: boolean;
  checkboxes?: {
    checked: string[];
    callback: (id: string) => void;
    selectAllCallback: () => void;
  };
  selectedSort: string;
  ascending: boolean;
  sortSelectionCallback: (columnId: string) => void;
  rowClickCallback?: (id: string) => void;
  noHeaderGradient?: boolean;
  titleColumnWidth?: string;
}

const fadedRowStyle = {
  opacity: 0.7,
  transition: '0.5s',
};
const disabledRowItemStyle = {
  opacity: 0.3,
};

const headerRowStyle = {
  // "& th": {
  //   //paddingTop: "0px",
  //   //paddingBottom: "15px",
  //   border: BORDER,
  // },
  // "& th:first-of-type": {
  //   borderTopLeftRadius: ROUNDING,
  // },
  // "& th:last-of-type": {
  //   borderTopRightRadius: ROUNDING,
  // },
  position: 'relative',
  zIndex: 0,
};

const bodyCellStyle = {
  //overflow: "visible",
  '& td': {
    maxWidth: '450px',
    paddingTop: BODY_CELL_Y_PADDING,
    paddingBottom: BODY_CELL_Y_PADDING,
    border: 0,
    borderLeft: `1px solid ${alpha(PALETTE.secondary.grey[2], 0.5)}`,
    borderTop: `1px solid ${alpha(PALETTE.secondary.grey[3], 0.2)}`,
  },
  '& tr:first-of-type': {
    borderTop: BORDER,
  },
  '& td:last-of-type': {
    borderLeft: 0,
  },
  // "& td:last-of-type": {
  //   borderRight: BORDER,
  // },
  // "& td:last-of-type": {
  //   borderRight: BORDER,
  // },
  // "& tr:first-of-type": {
  //   "& td": {
  //     borderTop: BORDER,
  //   },
  //   "& td:first-of-type": {
  //     borderTopLeftRadius: ROUNDING,
  //   },
  //   "& td:last-of-type": {
  //     borderTopRightRadius: ROUNDING,
  //   },
  // },
  // "& tr:last-of-type": {
  //   "& td": {
  //     borderBottom: BORDER,
  //   },
  //   // "& td:first-of-type": {
  //   //   borderBottomLeftRadius: ROUNDING,
  //   // },
  //   "& td:last-of-type": {
  //     borderBottom: 0,
  //   },
  // },
};

const Checkbox = (props: { checked: boolean }) => (
  <Stack
    border={`2px solid ${PALETTE.font.dark}`}
    borderRadius="3px"
    height="18px"
    width="18px"
    sx={{
      svg: {
        path: {
          fill: 'rgb(0,0,0)',
        },
      },
    }}
    justifyContent="center"
    alignItems="center"
  >
    {props.checked ? (
      <Box bgcolor="rgb(0,0,0)" height="7px" width="7px" borderRadius="100%" />
    ) : null}
  </Stack>
);

const UrsorTableBodyCell = (props: {
  columnName: string;
  item: string | number | JSX.Element;
  avatar?: JSX.Element;
  //clickCallback: () => void;
  disabled?: boolean;
  tags?: string[];
  faded?: boolean;
  url?: string;
  rowHovering?: boolean;
  button?: IUrsorTableCellSimpleButton;
  listButton?: IUrsorTableCellListButton;
  actionButtonItems?: IActionPopupItem[];
  checkbox?: { checked: boolean; callback: () => void };
  extraElement?: JSX.Element;
  newTagDatetime?: string;
  titleColumnWidth?: string;
  onClick?: () => void;
}) => {
  const [newTagOn, setNewTagOn] = useState<boolean>(false);
  React.useEffect(() => {
    if (
      props.newTagDatetime &&
      -dayjs(props.newTagDatetime).diff(dayjs(), 'seconds') < NEW_TAG_DURATION
    ) {
      setNewTagOn(true);
      setTimeout(() => setNewTagOn(false), NEW_TAG_DURATION * 1000);
    }
  }, [props.newTagDatetime]);
  return (
    <TableCell
      key={props.columnName}
      width={
        props.columnName === 'title'
          ? props.titleColumnWidth || '37%'
          : props.columnName === 'domain' || props.columnName === 'url'
          ? '23%'
          : props.columnName === 'accessLevel'
          ? '40px'
          : undefined
      }
      sx={{
        fontFamily: 'unset',
      }}
    >
      <Stack
        flex={1}
        sx={{
          display: 'flex',
          position: 'relative',
          svg: { path: { fill: PALETTE.font.dark } },
        }}
        justifyContent="flex-end"
        overflow={typeof props.item === 'string' ? 'hidden' : undefined}
      >
        <Stack
          direction="row"
          spacing="16px"
          position="relative"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          minWidth={props.columnName === 'title' ? '200px' : undefined}
          //maxWidth={typeof props.item === "string" ? "500px" : undefined}
        >
          <Stack
            width="100%"
            direction="row"
            spacing="10px"
            alignItems="center"
            // sx={{
            //   ...(props.columnName === "name"
            //     ? { maxWidth: 0, minWidth: "100%" }
            //     : {}),
            // }}
            onClick={props.onClick}
          >
            {props.checkbox ? (
              <Box
                onClick={props.checkbox.callback}
                sx={{
                  //width: props.checkbox.checked || props.rowHovering ? "20px" : 0,
                  opacity: props.checkbox.checked || props.rowHovering ? 1 : 0,
                  '&:hover': {
                    opacity: 0.5,
                  },
                  transition: '0.2s',
                }}
              >
                <Checkbox checked={props.checkbox.checked} />
              </Box>
            ) : null}
            <Stack
              minWidth="100%"
              maxWidth={0}
              direction="row"
              spacing="10px"
              alignItems="center"
              overflow="hidden"
            >
              {props.avatar}
              {typeof props.item === 'string' ||
              typeof props.item === 'number' ? (
                <Stack
                  width="100%"
                  sx={{
                    ...(props.disabled ? disabledRowItemStyle : {}),
                    // ...(props.columnName === "title"
                    //   ? { maxWidth: 0, minWidth: "100%" }
                    //   : {}),
                  }}
                >
                  <a
                    target="_blank"
                    href={props.url ? props.url : undefined}
                    style={{
                      textDecoration: 'none',
                      width: '100%',
                    }}
                  >
                    <Typography
                      sx={{
                        opacity: props.faded ? 0.4 : 1,
                        maxWidth:
                          props.columnName === 'title'
                            ? 0 //</a>"90%"
                            : props.columnName === 'domain' ||
                              props.columnName === 'url'
                            ? '200px'
                            : 0,
                        minWidth: '100%',
                      }}
                      noWrap
                    >
                      {props.item}
                    </Typography>
                  </a>
                </Stack>
              ) : (
                props.item
              )}
              {newTagOn ? <NewActivityTag /> : null}
            </Stack>
          </Stack>
          {props.button || props.listButton || props.actionButtonItems ? (
            <Box width="fit-content">
              {props.button ? (
                <Stack
                  onClick={props.button.callback}
                  sx={{
                    opacity: props.rowHovering ? 1 : 0,
                    '&:hover': {
                      opacity: 0.5,
                    },
                    transition: '0.2s',
                  }}
                >
                  <props.button.icon height="20px" width="20px" />
                </Stack>
              ) : null}
              {props.listButton && props.listButton.rows.length > 1 ? (
                <Stack
                  direction="row"
                  spacing="4px"
                  sx={{ opacity: props.rowHovering ? 1 : 0 }}
                >
                  {props.listButton.showCount &&
                  props.listButton.rows.length > 1 ? (
                    <Typography variant="medium" faded>{`+${
                      props.listButton.rows.length - 1
                    }`}</Typography>
                  ) : null}
                  <UrsorDropdownButton rows={props.listButton.rows}>
                    <props.listButton.icon
                      height={CELL_BUTTON_SIZE}
                      width={CELL_BUTTON_SIZE}
                    />
                  </UrsorDropdownButton>
                </Stack>
              ) : null}
              {props.actionButtonItems ? (
                <Stack width="16px" sx={{ opacity: props.rowHovering ? 1 : 0 }}>
                  <UrsorActionButton actions={props.actionButtonItems} />
                </Stack>
              ) : null}
            </Box>
          ) : null}
          {props.extraElement}
        </Stack>
      </Stack>
    </TableCell>
  );
};

export default function UrsorTable<T extends Record<string, any>>(
  props: IUrsorTableProps<T> & { children?: React.ReactNode }
) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // const [sortedColumn, setSortedColumn] = useState<string | undefined>(
  //   props.defaultSortedByColumn ||
  //     props.columns.find((col) => col.sortable)?.name
  // );
  // const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
  //   props.defaultSortedAscending ? "asc" : "desc"
  // );
  // const [sortedRows, setSortedRows] = useState<IUrsorTableRow<T>[]>([]);
  // useEffect(() => {
  //   if (sortedColumn) {
  //     const sorted = _.sortBy(props.rows, (row) =>
  //       row.items[sortedColumn].toLowerCase()
  //     );
  //     setSortedRows(
  //       sortDirection === "asc" ? _.reverse(sorted.slice()) : sorted
  //     );
  //   } else {
  //     setSortedRows(props.rows);
  //   }
  // }, [props.rows, sortDirection, sortedColumn]);

  const getRowStyle = (index: number, clickable: boolean) => {
    const highlightStyle =
      hoveredRow === null || index === hoveredRow ? null : fadedRowStyle;
    return {
      height: ROW_HEIGHT,
      //background: "#1A415A",
      transition: '0.2s',
      ...highlightStyle,
      position: 'relative',
      cursor: 'pointer',
      overflow: 'visible',
    };
  };

  const getHeaderCell = (
    displayName: string,
    fitBodyContent?: boolean,
    sort?: {
      direction?: 'asc' | 'desc';
      callback: () => void;
    },
    selectAll?: {
      ticked: boolean;
      callback: () => void;
    },
    button?: JSX.Element
    // sorted?: "asc" | "desc",
    // sortCallback?: () => void
  ) => {
    //@ts-ignore
    // const [hovering, setHovering] = useState<boolean>(false);
    return (
      <TableCell
        key={displayName}
        sx={{
          background: props.noHeaderGradient
            ? undefined
            : `linear-gradient(${PALETTE.secondary.grey[1]}, ${alpha(
                PALETTE.secondary.grey[1],
                0.5
              )}, ${alpha(PALETTE.secondary.grey[1], 0)})`,
          width: fitBodyContent ? 0 : 'auto',
          fontFamily: 'unset',
        }}
        // onMouseEnter={() => setHovering(true)}
        // onMouseLeave={() => setHovering(false)}
      >
        <Stack direction="row" spacing="10px" alignItems="center">
          {selectAll ? (
            <Box
              sx={{
                '&:hover': { opacity: 0.75 },
                transition: '0.2s',
                cursor: 'pointer',
              }}
              onClick={selectAll.callback}
            >
              <Checkbox checked={selectAll.ticked} />
            </Box>
          ) : null}
          <Stack
            direction="row"
            spacing="8px"
            onClick={sort?.callback}
            sx={
              sort
                ? {
                    '&:hover': { opacity: 0.75 },
                    transition: '0.2s',
                    cursor: 'pointer',
                  }
                : undefined
            }
            width="100%"
          >
            <Typography variant="small" bold>
              {displayName.toUpperCase()}
            </Typography>
            <Stack
              justifyContent="center"
              sx={{
                transform: `rotate(${sort?.direction === 'asc' ? 180 : 0}deg)`,
                transition: '0.2s',
                svg: {
                  path: {
                    fill: PALETTE.font.dark,
                  },
                },
                // opacity: sort ? (sort?.direction || hovering ? 1 : 0.4) : 0,
                opacity: sort ? (sort?.direction ? 1 : 0.4) : 0,
              }}
            >
              <ArrowDownIcon width="16px" height="16px" />
            </Stack>
          </Stack>
          {button}
        </Stack>
      </TableCell>
    );
  };

  return (
    <TableContainer
      sx={{
        width: 'unset',
        zIndex: 0, // needed to prevent the sticky header from being on top of dialogs
        border: BORDER,
        borderRadius: '12px',
      }}
    >
      <Table sx={{ overflow: 'visible' }}>
        <TableHead>
          <TableRow sx={headerRowStyle}>
            {[
              ...props.columns.map((column) =>
                getHeaderCell(
                  column.displayName,
                  false,
                  column.sortable
                    ? {
                        direction:
                          props.selectedSort === column.name
                            ? props.ascending
                              ? 'asc'
                              : 'desc'
                            : undefined,
                        // sortedColumn === column.name
                        //   ? sortDirection
                        //   : undefined,
                        callback: () => {
                          props.sortSelectionCallback(column.name);
                          // setSortDirection(
                          //   column.name !== sortedColumn ||
                          //     sortDirection === "asc"
                          //     ? "desc"
                          //     : "asc"
                          // );
                          // setSortedColumn(column.name);
                        },
                      }
                    : undefined,
                  column.selectAll && props.checkboxes
                    ? {
                        ticked:
                          props.checkboxes?.checked.length ===
                          props.rows.length,
                        callback: props.checkboxes.selectAllCallback,
                      }
                    : undefined,
                  column.headerButton
                )
              ),
            ]}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            ...bodyCellStyle,
            border: `${BORDER_THICKNESS} solid ${GLASS_WHITE_STROKE}`,
            borderRadius: ROUNDING,
          }}
          onMouseLeave={() => setHoveredRow(null)}
        >
          {props.rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={getRowStyle(rowIndex, !!props.rowClickCallback)}
              onMouseOver={() => setHoveredRow(rowIndex)}
            >
              {[
                ...props.columns.map((column) => (
                  <UrsorTableBodyCell
                    key={column.name}
                    columnName={column.name}
                    item={
                      column.itemDisplay?.(row.items[column.name]) ??
                      row.items[column.name]
                    }
                    avatar={column.getAvatar?.(row.id)}
                    disabled={row.disabled}
                    tags={row.tags}
                    rowHovering={hoveredRow === rowIndex}
                    faded={column.faded?.(row)}
                    url={column.link ? row.url : undefined}
                    button={column.getButton?.(row.id)}
                    listButton={column.getListButton?.(row.items[column.name])}
                    titleColumnWidth={props.titleColumnWidth}
                    actionButtonItems={column.getActionButtonItems?.(row.id)}
                    checkbox={
                      column.checkbox && props.checkboxes
                        ? {
                            checked: props.checkboxes.checked.includes(row.id),
                            callback: () => props.checkboxes!.callback(row.id),
                          }
                        : undefined
                    }
                    extraElement={column.getExtraElement?.(
                      row.id,
                      hoveredRow === rowIndex
                    )}
                    newTagDatetime={
                      column.newTag ? row.newTagDatetime : undefined
                    }
                    onClick={
                      !column.noRowClick
                        ? () => props.rowClickCallback?.(row.id)
                        : undefined
                    }
                  />
                )),
                ...(props.getActionButtonItems
                  ? [
                      <TableCell
                        key="actionButton"
                        sx={{
                          width: 0,
                        }}
                      >
                        {/* needed to align this in Safari */}
                        <Stack alignItems="flex-end">
                          <UrsorActionButton
                            background="transparent"
                            iconSize="16px"
                            size="16px"
                            actions={props.getActionButtonItems(row.id)}
                          />
                        </Stack>
                      </TableCell>,
                    ]
                  : []),
                ...(props.getEndButton
                  ? [
                      <TableCell
                        key="endButton"
                        sx={{
                          width: 0,
                          fontFamily: 'unset',
                        }}
                      >
                        {props.getEndButton(row.id)}
                      </TableCell>,
                    ]
                  : []),
              ]}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
