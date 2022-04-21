import { createSlice, current } from "@reduxjs/toolkit";

export interface Endpoint {
  url: string;
  status: boolean;
}

export interface EndpointSliceState {
  endpointsArray: Endpoint[];
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
const filteredEndpointsByStatus = initialEndpoints.filter(
  (endpoint) => endpoint.status === true
);
const initialEndpointId = Math.floor(
  Math.random() * filteredEndpointsByStatus.length
);
const initialCurrentEndpoint = initialEndpoints[initialEndpointId];

const initialState: EndpointSliceState = {
  endpointsArray: initialEndpoints,
  currentEndpointId: initialEndpointId,
  currentEndpoint: initialCurrentEndpoint,
};

export const endpointSlice = createSlice({
  name: "endpoint",
  initialState,
  reducers: {
    toggleEndpointStatus: (
      state,
      { payload }: { payload: { endpoint: Endpoint; index: number } }
    ) => {
      const { endpoint, index } = payload;

      state.endpointsArray[index].status = !state.endpointsArray[index].status;
      if (endpoint.url === state.currentEndpoint.url) {
        state.currentEndpointId = state.endpointsArray.findIndex(
          (endp) => endp.status === true
        );
        state.currentEndpoint = state.endpointsArray[state.currentEndpointId];
      }
    },
    addEndpoint: (state, { payload }: { payload: Endpoint }) => {
      state.endpointsArray.push(payload);
    },
    changeEndpoint: (
      state,
      { payload }: { payload: { endpoint: Endpoint; index: number } }
    ) => {
      const { endpoint, index } = payload;
      state.currentEndpoint = endpoint;
      state.currentEndpointId = index;
    },
    swapEndpoint: (state) => {
      let { endpointsArray, currentEndpointId } = state;
      currentEndpointId =
        currentEndpointId + 1 >= endpointsArray.length
          ? 0
          : currentEndpointId + 1;
      while (endpointsArray[currentEndpointId].status === false) {
        currentEndpointId =
          currentEndpointId + 1 >= endpointsArray.length
            ? 0
            : currentEndpointId + 1;
      }
      state.currentEndpointId = currentEndpointId;
      state.currentEndpoint = endpointsArray[currentEndpointId];
    },
    deleteEndpoint: (
      state,
      { payload }: { payload: { endpoint: Endpoint; index: number } }
    ) => {
      const { endpoint } = payload;
      state.endpointsArray = state.endpointsArray.filter(
        (endp) => endp.url !== endpoint.url
      );
      if (endpoint.url === state.currentEndpoint.url) {
        state.currentEndpointId = state.endpointsArray.findIndex(
          (endp) => endp.status === true
        );
        state.currentEndpoint = state.endpointsArray[state.currentEndpointId];
      }
    },
  },
});

export const {
  toggleEndpointStatus,
  addEndpoint,
  swapEndpoint,
  changeEndpoint,
  deleteEndpoint,
} = endpointSlice.actions;

export default endpointSlice.reducer;
