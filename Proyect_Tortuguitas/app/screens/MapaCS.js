import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from "react-native-maps";

export default class MapaCS extends Component {
  state = {
    coordinates: [
      //{ name: "1", latitude: 37.8025259, longitude: -122.4351431 },
      //{ name: "2", latitude: 37.7896386, longitude: -122.421646 },
      //{ name: "3", latitude: 37.7665248, longitude: -122.4161628 },
      //{ name: "4", latitude: 37.7734153, longitude: -122.4577787 },
      //{ name: "5", latitude: 37.7948605, longitude: -122.4596065 },

      {
        name: "A",
        latitude: 19.3895472,
        latitudeDelta: 0.001,
        longitude: -99.095331,
        longitudeDelta: 0.001,
      },
      {
        name: "B",
        latitude: 19.3895479,
        latitudeDelta: 0.001,
        longitude: -99.0953639,
        longitudeDelta: 0.001,
      },
      {
        name: "C",
        latitude: 17.650599621556832,
        latitudeDelta: 1.3389790998356546,
        longitude: -101.55993595719337,
        longitudeDelta: 0.9659144282341146,
      },
      {
        name: "D",
        latitude: 18.47033152356152,
        latitudeDelta: 2.7784830233139353,
        longitude: -102.93928356841207,
        longitudeDelta: 1.7603958025574826,
      },
      {
        name: "E",
        latitude: 19.24743283121325,
        latitudeDelta: 15.580761330872994,
        longitude: -101.63377264514565,
        longitudeDelta: 9.156973399221883,
      },
      {
        name: "F",
        latitude: 18.298070025533598,
        latitudeDelta: 1.1259200182059175,
        longitude: -100.25754829868674,
        longitudeDelta: 0.8073633536696434,
      },
      {
        name: "G",
        latitude: 19.27023323955642,
        latitudeDelta: 0.0015561884872461462,
        longitude: -99.19441284611821,
        longitudeDelta: 0.0009994581341885578,
      },
      {
        name: "H",
        latitude: 19.104265734169278,
        latitudeDelta: 0.16050285947488163,
        longitude: -99.31825278326869,
        longitudeDelta: 0.09417470544576645,
      },
      {
        name: "I",
        latitude: 19.344467488276525,
        latitudeDelta: 0.005747723709497166,
        longitude: -99.0025101788342,
        longitudeDelta: 0.0034013763070106506,
      },
      {
        name: "J",
        latitude: 19.344467488276525,
        latitudeDelta: 0.005747723709497166,
        longitude: -99.0025101788342,
        longitudeDelta: 0.0034013763070106506,
      },
      {
        name: "K",
        latitude: 19.344467488276525,
        latitudeDelta: 0.005747723709497166,
        longitude: -99.0025101788342,
        longitudeDelta: 0.0034013763070106506,
      },
      {
        name: "L",
        latitude: 19.252107906144847,
        latitudeDelta: 0.031720697010904075,
        longitude: -99.12672998383641,
        longitudeDelta: 0.01857127994298935,
      },
      {
        name: "M",
        latitude: 19.351877474635298,
        latitudeDelta: 0.0017161090401316414,
        longitude: -98.98065654560924,
        longitudeDelta: 0.0010054931044578552,
      },
      {
        name: "N",
        latitude: 19.365327102503063,
        latitudeDelta: 0.0017532917809788273,
        longitude: -98.95328460261226,
        longitudeDelta: 0.001026950776562785,
      },
      {
        name: "O",
        latitude: 19.3709794,
        latitudeDelta: 0.001,
        longitude: -98.9510046,
        longitudeDelta: 0.001,
      },
      {
        name: "P",
        latitude: 19.11760915831473,
        latitudeDelta: 0.044684117894927766,
        longitude: -99.53651117160916,
        longitudeDelta: 0.02795029431580076,
      },
      {
        name: "Q",
        latitude: 19.6856414202106,
        latitudeDelta: 0.20173417703416519,
        longitude: -99.03740370646119,
        longitudeDelta: 0.11842522770164976,
      },
      {
        name: "R",
        latitude: 19.843993749179404,
        latitudeDelta: 5.600196097634193,
        longitude: -101.29213146865368,
        longitudeDelta: 3.708968013524995,
      },
      {
        name: "S",
        latitude: 19.36057071660933,
        latitudeDelta: 0.0025194617447183987,
        longitude: -98.96560532972217,
        longitudeDelta: 0.0015908852219581604,
      },
      {
        name: "T",
        latitude: 19.345041719116374,
        latitudeDelta: 0.1505661146753603,
        longitude: -99.3476383946836,
        longitudeDelta: 0.08820679038761625,
      },
      {
        name: "U",
        latitude: 19.332575473741734,
        latitudeDelta: 0.05098980794822694,
        longitude: -99.0013843216002,
        longitudeDelta: 0.03673519939184189,
      },
      {
        name: "V",
        latitude: 19.36031418627592,
        latitudeDelta: 0.0017065307592751822,
        longitude: -98.9670661278069,
        longitudeDelta: 0.000999458134160136,
      },
      {
        name: "W",
        latitude: 19.3569849148025,
        latitudeDelta: 0.0017071982464216262,
        longitude: -98.95819706842303,
        longitudeDelta: 0.0010001286864138592,
      },
      {
        name: "X",
        latitude: 19.25970996014392,
        latitudeDelta: 0.017579380285354773,
        longitude: -99.06096724793315,
        longitudeDelta: 0.010292641818523407,
      },
      {
        name: "Y",
        latitude: 21.043999500169683,
        latitudeDelta: 7.44197278475983,
        longitude: -97.9260347597301,
        longitudeDelta: 5.429213158786297,
      },
      {
        name: "Z",
        latitude: 17.22977617782739,
        latitudeDelta: 2.0270810214819477,
        longitude: -100.55048324167728,
        longitudeDelta: 1.3343795388937139,
      },
      {
        name: "A1",
        latitude: 19.3895472,
        latitudeDelta: 0.001,
        longitude: -99.095331,
        longitudeDelta: 0.001,
      },
    ],
  };

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 19.3895472,
          longitude: -99.095331,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}
      >
        {this.state.coordinates.map((marker) => (
          <Marker
            key={marker.name}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <Image
              style={{ width: 36, height: 36 }}
              source={require("../../assets/torMar.png")}
            />
          </Marker>
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});
