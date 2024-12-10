import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Theme } from "../Components/Theme";
import { getFlagUrl } from "../Components/Flags";

const DropDown = ({
  onSelectCurrency,
  selectedCurrencyCode = "USD",
  onImageSelect,
  isSource = true,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://openexchangerates.org/api/currencies.json"
        );
        const data = await response.json();
        const currencyList = Object.entries(data).map(([code, name]) => ({
          code,
          name,
          image: getFlagUrl(code) ? { uri: getFlagUrl(code) } : null,
        }));
        setAvailableCurrencies(currencyList);

        // Set initial currency after fetching
        const initialCurrency =
          currencyList.find((c) => c.code === selectedCurrencyCode) ||
          currencyList[0];
        setCurrentCurrency(initialCurrency);
      } catch (error) {
        console.error("Currency fetch error: ", error);
      }
    };

    fetchCurrencies();
  }, []);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  const selectCurrency = (currency) => {
    setCurrentCurrency(currency);
    setExpanded(false);
    onSelectCurrency && onSelectCurrency(currency.code);
  };

  const renderCurrencyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.currencyItem}
      onPress={() => selectCurrency(item)}
    >
      {item.image && <Image source={item.image} style={styles.currencyFlag} />}
      <View>
        <Text style={styles.currencyCode}>{item.code}</Text>
        <Text style={styles.currencyName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render nothing if currentCurrency is not set
  if (!currentCurrency) {
    return null;
  }

  return (
    <View style={styles.container}>
      {currentCurrency.image && (
        <Image source={currentCurrency.image} style={styles.selectedFlag} />
      )}
      <TouchableOpacity
        style={styles.selectedCurrency}
        onPress={toggleDropdown}
      >
        <Text style={{ fontFamily: Theme.fonts.text600 }}>
          {currentCurrency.code}
        </Text>
        <AntDesign
          name={expanded ? "caretup" : "caretdown"}
          color={"#D3D3D3"}
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.dropdownList}>
          <FlatList
            data={availableCurrencies}
            renderItem={renderCurrencyItem}
            keyExtractor={(item) => item.code}
            style={styles.list}
          />
        </View>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 10,
    flexDirection: "row",
  },
  selectedCurrency: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  selectedFlag: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  selectedCode: {
    fontFamily: Theme.fonts.text600,
    marginRight: 10,
  },
  dropdownIcon: {
    marginLeft: "auto",
    left: 10,
  },
  dropdownList: {
    position: "absolute",
    width: 200,
    // height: 1000,
    top: 50,
    left: 0,
    right: 0,
    maxHeight: 70,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  list: {
    maxHeight: 300,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  currencyFlag: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 15,
  },
  currencyCode: {
    fontFamily: Theme.fonts.text600,
    fontSize: 16,
  },
  currencyName: {
    fontFamily: Theme.fonts.text500,
    color: "#666",
    fontSize: 12,
  },
});
