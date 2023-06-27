/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2FoYWtob3ZoYW5uaXN5YW4xMTEiLCJhIjoiY2xpenFiNTQ5MGdxbzNkdDhydjFpMWFiMyJ9.WU8lPhN_kckM8_XAGq9AEA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sahakhovhannisyan111/clizqin6f00b901qq211xavwa',
    scrollZoom: false,
    //   center: [],
    //   zoom: 10,
    //   interactive: false,
  });
  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}:${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
