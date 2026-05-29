export function getMapBounds(map) {
    const mapBounds = map.getBounds()

    return {
        north: mapBounds.getNorth(),
        south: mapBounds.getSouth(),
        east: mapBounds.getEast(),
        west: mapBounds.getWest(),
        zoom: map.getZoom(),
    }
}