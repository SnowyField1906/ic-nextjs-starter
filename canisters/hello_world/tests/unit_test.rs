use std::fs;

use candid::{
	decode_one,
	encode_one,
	CandidType,
	Principal,
};
use ic_cdk::api::management_canister::provisional::CanisterId;
use pocket_ic::{
	PocketIc,
	WasmResult,
};

const WASM_DIR: &str = "../target/wasm32-unknown-unknown/release/hello_world.wasm";
const TWO_T_CYCLES: u128 = 2_000_000_000_000;

fn setup() -> (PocketIc, Principal) {
	let pic: PocketIc = PocketIc::new();
	let canister: Principal = pic.create_canister();
	let wasm = fs::read(WASM_DIR).expect("Wasm file not found, run 'dfx build'.");

	pic.add_cycles(canister, TWO_T_CYCLES);
	pic.install_canister(canister, wasm, vec![], None);

	(pic, canister)
}

fn call_canister<T: CandidType>(
	pic: &PocketIc, canister: CanisterId, method: &str, args: T,
) -> Vec<u8> {
	let response: WasmResult = pic
		.update_call(
			canister,
			Principal::anonymous(),
			method,
			encode_one(args).unwrap(),
		)
		.expect(format!("Failed to call canister method '{}'", method).as_str());

	match response {
		WasmResult::Reply(reply) => reply,
		_ => panic!("Unexpected response"),
	}
}

fn query_canister<T: CandidType>(
	pic: &PocketIc, canister: CanisterId, method: &str, args: T,
) -> Vec<u8> {
	let resopnse: WasmResult = pic
		.query_call(
			canister,
			Principal::anonymous(),
			method,
			encode_one(args).unwrap(),
		)
		.expect(format!("Failed to query canister method '{}'", method).as_str());

	match resopnse {
		WasmResult::Reply(reply) => reply,
		_ => panic!("Unexpected response"),
	}
}

/*
 *
 ******** TESTS ************
 *
 */

#[test]
fn should_return_default_greet() {
	let (pic, canister): (PocketIc, Principal) = setup();

	let response: Vec<u8> = query_canister(&pic, canister, "greet", ());
	let result: String = decode_one(&response).unwrap();
	let expected: &str = "Hello, world!";

	assert_eq!(result, expected);
}

#[test]
fn should_custom_greet() {
	let (pic, canister): (PocketIc, Principal) = setup();

	call_canister(&pic, canister, "set", "custom");

	let response: Vec<u8> = query_canister(&pic, canister, "greet", ());
	let result: String = decode_one(&response).unwrap();
	let expected: &str = "Hello, custom!";

	assert_eq!(result, expected);
}
