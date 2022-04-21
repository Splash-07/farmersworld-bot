import { createSlice } from "@reduxjs/toolkit";

interface Endpoint {
  url: string;
  status: boolean;
}

export interface EndpointSliceState {
  endpoints: Endpoint[];
  currentEndpointId: number;
  currentEndpoint: Endpoint;
}

const initialEndpoints: Endpoint[] = [
  {
    url: "https://chain.wax.io",
    status: true,
  },
  {
    url: "https://wax.pink.gg",
    status: true,
  },
  {
    url: "https://api.waxsweden.org",
    status: true,
  },
  {
    url: "https://wax.eosphere.io",
    status: true,
  },
  {
    url: "https://wax.cryptolions.io",
    status: true,
  },
  {
    url: "https://wax.dapplica.io",
    status: true,
  },
];
const initialEndpointId = Math.floor(Math.random() * initialEndpoints.length);
const initialCurrentEndpoint = initialEndpoints[initialEndpointId];

const initialState: EndpointSliceState = {
  endpoints: initialEndpoints,
  currentEndpointId: initialEndpointId,
  currentEndpoint: initialCurrentEndpoint,
};

export const endpointSlice = createSlice({
  name: "endpoint",
  initialState,
  reducers: {
    toggleEndpointStatus: (
      state,
      { payload }: { payload: { targetEndpoint: Endpoint; index: number } }
    ) => {
      const { targetEndpoint, index } = payload;

      state.endpoints[index].status = !state.endpoints[index].status;
      if (targetEndpoint.url === state.currentEndpoint.url) {
        state.currentEndpointId = state.endpoints.findIndex(
          (endpoint) => endpoint.status === true
        );
        state.currentEndpoint = state.endpoints[state.currentEndpointId];
      }
    },
    addEndpoint: (state, { payload }: { payload: Endpoint }) => {
      state.endpoints.push(payload);
    },
    changeEndpoint: (state) => {
      let { endpoints, currentEndpointId } = state;
      currentEndpointId =
        currentEndpointId + 1 >= endpoints.length ? 0 : currentEndpointId + 1;
      while (endpoints[currentEndpointId].status === false) {
        currentEndpointId =
          currentEndpointId + 1 >= endpoints.length ? 0 : currentEndpointId + 1;
      }
      state.currentEndpointId = currentEndpointId;
      state.currentEndpoint = endpoints[currentEndpointId];
    },
    deleteEndpoint: (
      state,
      { payload }: { payload: { targetEndpoint: Endpoint } }
    ) => {
      const { targetEndpoint } = payload;
      let { currentEndpoint, currentEndpointId, endpoints } = state;
      if (targetEndpoint.url === currentEndpoint.url) {
        currentEndpointId = endpoints.findIndex(
          (endpoint) => endpoint.status === true
        );
        currentEndpoint = endpoints[state.currentEndpointId];
      }
      endpoints = endpoints.filter(
        (endpoint) => endpoint.url !== targetEndpoint.url
      );
    },
  },
});

export const {
  toggleEndpointStatus,
  addEndpoint,
  changeEndpoint,
  deleteEndpoint,
} = endpointSlice.actions;

export default endpointSlice.reducer;
