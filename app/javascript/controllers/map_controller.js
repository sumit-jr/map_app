import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    latitude: { type: Number, default: 37.7749 },
    longitude: { type: Number, default: -122.4194 },
    zoom: { type: Number, default: 12 }
  }

  connect() {
    const apiKey = document.querySelector("meta[name='google-maps-api-key']").content;

    if (typeof google === 'undefined') {
      this.loadScript(apiKey).then(() => this.initMap());
    } else {
      this.initMap();
    }
  }

  loadScript(apiKey) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  initMap() {
    console.log("Initializing map...");
    const map = new google.maps.Map(this.element, {
      center: { lat: this.latitudeValue, lng: this.longitudeValue },
      zoom: this.zoomValue
    });

    // Add a marker
    new google.maps.Marker({
      position: { lat: this.latitudeValue, lng: this.longitudeValue },
      map: map,
      title: 'Hello World!'
    });
  }
}