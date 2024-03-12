use std::cell::RefCell;

use ic_cdk::{
	query,
	update,
};

thread_local! {
	static NAME: RefCell<String> = RefCell::new("world".to_string());
}

#[query]
fn greet() -> String {
	let name = NAME.with(|name| (*name.borrow()).clone());
	format!("Hello, {}!", name)
}

#[update]
fn set(new_name: String) {
	NAME.with(|name| *name.borrow_mut() = new_name);
}
