/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v24.0.0
 * @link http://www.ag-grid.com/
 * @license MIT
 */
/***********************************************************************
 * Don't forget to update PropertyKeys if changing this class. PLEASE! *
 ***********************************************************************/
// when merging columns (eg column types, defaultColDef and the colDef) we give special treatment to param
// objects, as we want param objects to be merged.
export var COL_DEF_PARAM_OBJECTS = [
    'tooltipComponentParams', 'headerGroupComponentParams', 'cellRendererParams',
    'cellEditorParams', 'pinnedRowCellRendererParams', 'columnsMenuParams',
    'headerComponentParams'
];
