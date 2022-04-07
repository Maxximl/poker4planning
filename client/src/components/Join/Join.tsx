import { Button, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Join.module.css";
import { IJoin } from "./Join.types";

export const Join: React.FC<IJoin> = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                <h2 className={styles.heading}>Введите данные</h2>
                <div>
                    <Input
                        className={styles.joinInput}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Имя"
                        size="large"
                    />
                </div>
                <div className={styles.joinInput}>
                    <Input
                        onChange={(event) => setRoom(event.target.value)}
                        placeholder="Комната"
                        size="large"

                    />
                </div>
                <Link
                    className={styles.buttonLink}
                    onClick={(event) =>
                        !name || !room ? event.preventDefault() : null
                    }
                    to={`/room?name=${name}&room=${room}`}>
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                    >
                        Войти
                    </Button>
                </Link>
            </div>
        </div>
    );
};
