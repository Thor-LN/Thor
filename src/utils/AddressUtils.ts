const lnPubKey = /^[a-f0-9]{66}$/;

class AddressUtils {
  isValidLightningPubKey = (input: string) => lnPubKey.test(input);
}

const addressUtils = new AddressUtils();

export default addressUtils;
