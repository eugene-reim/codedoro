// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn close_app() {
    std::process::exit(0x0);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![close_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
