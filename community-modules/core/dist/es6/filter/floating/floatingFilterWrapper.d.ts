// Type definitions for @ag-grid-community/core v24.0.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from '../../entities/column';
import { IFilterDef } from '../../interfaces/iFilter';
import { AbstractHeaderWrapper } from '../../headerRendering/header/abstractHeaderWrapper';
import { Beans } from '../../rendering/beans';
export declare class FloatingFilterWrapper extends AbstractHeaderWrapper {
    private static TEMPLATE;
    private columnHoverService;
    private gridOptionsWrapper;
    private userComponentFactory;
    private gridApi;
    private columnApi;
    private filterManager;
    private menuFactory;
    protected beans: Beans;
    private eFloatingFilterBody;
    private eButtonWrapper;
    private eButtonShowMainFilter;
    protected readonly column: Column;
    protected readonly pinned: string;
    private suppressFilterButton;
    private floatingFilterCompPromise;
    constructor(column: Column, pinned: string);
    protected postConstruct(): void;
    protected onTabKeyDown(e: KeyboardEvent): void;
    protected handleKeyDown(e: KeyboardEvent): void;
    protected onFocusIn(e: FocusEvent): void;
    private setupFloatingFilter;
    private setupLeftPositioning;
    private setupSyncWithFilter;
    private showParentFilter;
    private setupColumnHover;
    private onColumnHover;
    private setupWidth;
    private onColumnWidthChanged;
    private setupWithFloatingFilter;
    private parentFilterInstance;
    private getFilterComponent;
    static getDefaultFloatingFilterType(def: IFilterDef): string;
    private getFloatingFilterInstance;
    private createDynamicParams;
    private getFilterComponentPrototype;
    private currentParentModel;
    private onParentModelChanged;
    private onFloatingFilterChanged;
}
