function oopsie() {
  setTimeout(oopsie, 10000);
  console.info("just saying hello - is this thing on?");
  return true;
}

setTimeout(oopsie, 3000);
