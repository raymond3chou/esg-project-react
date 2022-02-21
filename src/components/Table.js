import * as React from 'react';
import PropTypes from 'prop-types';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
  } from '@mui/x-data-grid';

import Securities from './Securities';

const columns = [
    { 
        field: 'Short Name', 
        headerName: 'Company', 
        flex: 1,
        // width: 90 
    },
    {
        field: 'SA',
        headerName: 'Sustainalytics Score',
        // width: 150,
        flex: 1,
        editable: false,
    },
    {
        field: 'MSCI',
        headerName: 'MSCI',
        flex: 1,
        // width: 150,
        editable: false,
    },
    {
        field: 'ISS',
        headerName: 'ISS',
        flex: 1,
        // width: 150,
        editable: false,
    },
    {
        field: 'CDP',
        headerName: 'CDP',
        flex: 1,
        // width: 150,
        editable: false,
    },
    {
        field: 'S&P',
        headerName: 'S&P',
        flex: 1,
        // width: 150,
        editable: false,
    },
];

const pageToHeight = {
    5:250,
    10:400,
    25:750
}

const CustomToolbar = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );
  
  CustomToolbar.propTypes = {
    setFilterButtonEl: PropTypes.func.isRequired,
  };

export default function Table() {
    const rows = Securities()
    const [height, setHeight] = React.useState(400);
    const [pageSize, setPageSize] = React.useState(10);
    const [filterButtonEl, setFilterButtonEl] = React.useState(null);

    return (
        <div style={{ height, width: '100%' }}>
            <DataGrid
                rows={rows}
                rowHeight={25}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => {
                    setPageSize(newPageSize)
                    setHeight(pageToHeight[newPageSize])
                }}
                rowsPerPageOptions={[5, 10, 25]}
                components={{
                    Toolbar: CustomToolbar,
                  }}
                  componentsProps={{
                    panel: {
                      anchorEl: filterButtonEl,
                    },
                    toolbar: {
                      setFilterButtonEl,
                    },
                  }}
                // checkboxSelection
                // disableSelectionOnClick
            />
        </div>
    );
}