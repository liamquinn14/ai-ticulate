use axum::{routing::get, Router};
use socketioxide::{
    extract::{Data, SocketRef},
    SocketIo,
};
use tower::ServiceBuilder;
use tower_http::cors::CorsLayer;
use tracing::info;
use tracing_subscriber::FmtSubscriber;

#[derive(Debug, serde::Deserialize)]
struct MessageIn {
    room: String,
    text: String,
}

#[derive(serde::Serialize)]
struct MessageOut {
    text: String,
    user: String,
    date: chrono::DateTime<chrono::Utc>,
}

async fn on_connect(socket: SocketRef) {
    info!("socket connected: {}", socket.id);
    socket.on("message", |socket: SocketRef, Data::<MessageIn>(data)| {
        info!("Received message: {:?}", data);

        let response = MessageOut {
            text: data.text,
            user: format!("anon-{}", socket.id),
            date: chrono::Utc::now(),
        };

        let _ = socket.within(data.room).emit("message", response);
    });

    socket.on("join", |socket: SocketRef, Data::<String>(room)| {
        info!("Joining room: {}", room);
        let _ = socket.leave_all();
        let _ = socket.join(room);
    })
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing::subscriber::set_global_default(FmtSubscriber::default())?;

    let (layer, io) = SocketIo::new_layer();

    io.ns("/", on_connect);

    let app: Router = axum::Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .layer(
            ServiceBuilder::new()
                .layer(CorsLayer::permissive())
                .layer(layer),
        );
    info!("Starting server on");

    axum::Server::bind(&"127.0.0.1:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
