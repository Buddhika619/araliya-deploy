import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
// Create styles
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    paddingBottom: 25,
    paddingTop: 25,
  },
  header: {
    width: 596,
    margin: "0 auto",
    textAlign: "center",
    backgroundColor: "#1abc9c",
    padding: 10,
    // display:'flex',
    // flexDirection: 'row'
  },

  client: {
    width: 596,
    // textAlign: 'center',
    backgroundColor: "white",
    padding: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  address: {
    display: "flex",
    alignItems: "flex-end",
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  itemHeader: {
    width: 596,
    // textAlign: 'center',
    backgroundColor: "white",
    padding: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -15,
  },
  border: {
    borderBottom: "5 solid gray",
  },

  itemData: {
    width: 596,
    // textAlign: 'center',
    borderBottom: "1 solid gray",
    backgroundColor: "white",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 7.5,
    paddingTop: 7.5,
    // marginTop:-15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
  },

  total: {
    width: 596,
    // textAlign: 'center',
    backgroundColor: "white",
    padding: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -15,
    fontSize: 15,
  },

  img: {
    width: 90,
    margin: 25,
  },

  footer: {
    width: 596,
    // textAlign: 'center',
    backgroundColor: "white",
    padding: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
  },
});

// Create Document Component
function BasicDocument() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { success, order } = orderDetails;

  const [qr, setQr] = useState("");
  const generateQR = async (text) => {
    try {
      setQr(await QRCode.toDataURL(text));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const id = window.location.pathname.split("/")[3];
    console.log(window.location.href);
    dispatch(getOrderDetails(id));
    generateQR(`${window.location.href}`);
  }, []);

  return (
    <>
      {success && (
        <PDFViewer style={styles.viewer}>
          {/* Start of the document*/}
          <Document>
            {/*render a single page*/}
            <Page size="A4" style={styles.page}>
              <View style={styles.header}>
                <Text>Hotel Araliya</Text>
              </View>

              <View style={styles.client}>
                <View style={styles.person}>
                  <Text style={{ paddingBottom: "6" }}>
                    Name: {order.user.name}
                  </Text>
                  <Text style={{ paddingBottom: "6" }}>
                    Date: {order.createdAt.slice(0, 10)}
                  </Text>
                  <Text>ID: {order._id}</Text>
                </View>

                <View style={styles.address}>
                  {/* <Text>{order.shippingAddress.lineOne}</Text>
                  <Text>{order.shippingAddress.lenetwo}</Text>
                  <Text>{order.shippingAddress.lineThree}</Text>
                  <Text>{order.user.name}</Text> */}
                </View>
              </View>

              <View style={styles.itemHeader}>
                <Text style={{ flex: "1.5" }}>Product ID</Text>
                <Text style={{ flex: "2" }}>Description</Text>
                <Text style={{ flex: "1" }}>price</Text>
                <Text style={{ flex: "1" }}>SubTotal</Text>
              </View>

              <View style={styles.border}></View>

              {order.orderItems.map((item) => (
                <View key={item._id} style={styles.itemData}>
                  <Text style={{ flex: "1.5", alignItems: "flex-start" }}>
                    {item.product}
                  </Text>
                  <Text
                    style={{
                      flex: "2",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      flex: "1",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    Rs {item.qty} x {item.price}
                  </Text>
                  <Text
                    style={{
                      flex: "1",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    Rs {item.qty * item.price}
                  </Text>
                </View>
              ))}

              <View style={styles.border}></View>
              <View style={styles.total}>
                <Text style={{ flex: "1.5" }}></Text>
                <Text style={{ flex: "1" }}></Text>
                <Text style={{ flex: "2" }}>SubTotal</Text>
                <Text style={{ flex: "1" }}>: Rs{order.subTotal}</Text>
              </View>

              <View style={styles.total}>
                <Text style={{ flex: "1.5" }}></Text>
                <Text style={{ flex: "1" }}></Text>
                <Text style={{ flex: "2" }}>Delivery Charge</Text>
                <Text style={{ flex: "1" }}>: Rs{order.shippingPrice}</Text>
              </View>
              <View style={styles.border}></View>
              <View style={styles.total}>
                <Text style={{ flex: "1.5" }}></Text>
                <Text style={{ flex: "1" }}></Text>
                <Text style={{ flex: "2" }}>Total Price</Text>
                <Text style={{ flex: "1" }}>: Rs{order.totalPrice}</Text>
              </View>
              <View style={styles.border}></View>
              <Image style={styles.img} src={qr} alt="Red dot" />
              <View style={styles.footer}>
                <Text>CreatedBy: {order.user.name}</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </>
  );
}

const PrintView = () => {
  return (
    <div className="App">
      <BasicDocument />
    </div>
  );
};

export default PrintView;
